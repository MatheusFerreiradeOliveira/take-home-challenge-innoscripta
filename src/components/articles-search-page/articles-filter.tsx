"use client";
import { useFilters } from "@/hooks/useFilters";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { FiltersInterface } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import TheGuardianService from "@/services/the-guardian";
import { ALL_CATEGORIES_NYT } from "@/utils/functions";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ArticlesFilter() {
  const { values, updateValues } = useFilters();

  const [concatenatedSecions, setConcatenatedSections] = useState<
    { label: string; value: string }[]
  >([]);

  const { data, isFetching: isFetchingSources } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const sections = await TheGuardianService.getSections();

      let allNYTCategories = ALL_CATEGORIES_NYT.map((category) => ({
        label: category,
        value: category,
      }));

      let allSections = new Set(allNYTCategories);

      sections.response.results.map((result) => {
        if (!ALL_CATEGORIES_NYT.includes(result.webTitle)) {
          allSections.add({
            label: result.webTitle,
            value: result.id,
          });
        }
      });

      setConcatenatedSections(
        Array.from(allSections).sort((s1, s2) =>
          s1.value.toLowerCase() < s2.value.toLowerCase() ? -1 : 1
        )
      );

      return sections.response;
    },
    refetchOnWindowFocus: false,
  });

  const handleChangeDate = useCallback(
    (field: "initialDate" | "finalDate", value?: Date) => {
      let newValues: Partial<FiltersInterface> = {};
      newValues[field] = value;

      if (field === "initialDate" && value && values.finalDate) {
        if (dayjs(value).isAfter(dayjs(values.finalDate))) {
          newValues.finalDate = undefined;
        }
      }

      updateValues(newValues);
    },
    [updateValues, values]
  );

  return (
    <div className="relative z-50 w-full max-w-[1000px]">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full"
        )}
      >
        <div className="col-span-1 flex flex-col gap-2 w-full max-w-[300px]">
          {/* <h1 className="text-lg text-foreground">Search by category</h1> */}

          <MultiSelect
            options={concatenatedSecions?.map((category) => category) || []}
            onValueChange={useDebounce(
              (e) => updateValues({ sections: e }),
              500
            )}
            defaultValue={values.sections}
            placeholder="Categories"
            variant="inverted"
            maxCount={3}
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-2 w-full max-w-[300px]">
          {/* <h1 className="text-lg text-foreground">Select your sources</h1> */}
          {isFetchingSources ? (
            <Skeleton className="h-10" />
          ) : (
            <MultiSelect
              options={[
                {
                  label: "The Guardian",
                  value: "the-guardian-api",
                },
                {
                  label: "The New York Times",
                  value: "the-new-york-times",
                },
              ]}
              onValueChange={(e) => updateValues({ articlesSources: e })}
              defaultValue={values.articlesSources}
              placeholder="Sources"
              variant="inverted"
              maxCount={3}
              className="w-full"
            />
          )}
        </div>

        <div className="col-span-1">
          <DatePicker
            value={values.initialDate}
            setValue={(e) => handleChangeDate("initialDate", e)}
            placeholder="From date"
          />
        </div>
        <div className="col-span-1">
          <DatePicker
            value={values.finalDate}
            setValue={(e) => handleChangeDate("finalDate", e)}
            placeholder="To date"
            initialValue={values.initialDate || undefined}
          />
        </div>

        {/* <div className="col-span-1">
          <Select
            value={values.orderBy}
            onValueChange={(e: "newest" | "relevance") =>
              updateValues({ orderBy: e })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"1"} value={"newest"}>
                Newest
              </SelectItem>
              <SelectItem key={"2"} value={"relevance"}>
                Relevance
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
}
