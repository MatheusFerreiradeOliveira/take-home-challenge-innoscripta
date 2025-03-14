"use client";
import { useFiltersData } from "@/hooks/useFiltersData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { ALL_CATEGORIES } from "@/utils/functions";
import { Input } from "./ui/input";
import useDebounce from "@/hooks/useDebounce";
import { DatePicker } from "./ui/date-picker";
import { useCallback } from "react";
import dayjs from "dayjs";
import { NewsFilters } from "@/types/filters";
import NewsAPIService from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "./ui/multi-select";
import { Skeleton } from "./ui/skeleton";

export default function NewsFilter() {
  const { values, updateValues } = useFiltersData();

  const { data: sources, isFetching: isFetchingSources } = useQuery({
    queryKey: ["sources"],
    queryFn: async () => {
      const sources = await NewsAPIService.getSources();

      sources.sources.push({
        id: "the-new-york-times",
        name: "The New York Times",
      });

      updateValues({ sources: sources.sources.map((source) => source.id) });

      return sources;
    },
    refetchOnWindowFocus: false,
  });

  const handleChangeDate = useCallback(
    (field: "initialDate" | "finalDate", value?: Date) => {
      let newValues: Partial<NewsFilters> = {};
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

  console.log("sourcesasdadsasd", values.sources);

  return (
    <div className="flex flex-col gap-10 py-20 border-r border-separator pr-20 my-2">
      <div className="flex flex-col gap-2 w-full max-w-[300px]">
        <h1 className="text-lg text-foreground">Search by author</h1>
        <Input
          placeholder="Author name"
          value={values.keyword}
          onChange={useDebounce(
            (e) => updateValues({ keyword: e.target.value }),
            500
          )}
        />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[300px]">
        <h1 className="text-lg text-foreground">Search by category</h1>
        <Input
          placeholder="sports, politics, etc."
          value={values.keyword}
          onChange={useDebounce(
            (e) => updateValues({ keyword: e.target.value }),
            500
          )}
        />
        {/* <Select
          value={values.category}
          onValueChange={(e) =>
            updateValues({ category: e === "all" ? "" : e })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {values.category && (
              <SelectItem
                className="text-muted-foreground"
                key="all"
                value={"all"}
              >
                Clear
              </SelectItem>
            )}
            {ALL_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[300px]">
        <h1 className="text-lg text-foreground">Select your sources</h1>
        {isFetchingSources ? (
          <Skeleton className="h-10" />
        ) : (
          <MultiSelect
            options={
              sources?.sources.map((source) => ({
                label: source.name,
                value: source.id,
              })) || []
            }
            onValueChange={(e) => updateValues({ sources: e })}
            defaultValue={values.sources}
            placeholder="Select sources"
            variant="inverted"
            maxCount={3}
            className="w-full"
          />
        )}
      </div>

      {/* <div>
        <DatePicker
          value={values.initialDate}
          setValue={(e) => handleChangeDate("initialDate", e)}
          placeholder="Initial date"
        />
      </div>
      <div>
        <DatePicker
          value={values.finalDate}
          setValue={(e) => handleChangeDate("finalDate", e)}
          placeholder="Final date"
          initialValue={values.initialDate || undefined}
        />
      </div> */}
    </div>
  );
}
