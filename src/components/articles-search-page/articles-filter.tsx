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
import { Menu, X } from "lucide-react";
import TheGuardianService from "@/services/the-guardian";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ArticlesFilter() {
  const { values, updateValues } = useFilters();

  const { data: sections, isFetching: isFetchingSources } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const sections = await TheGuardianService.getSections();

      console.log("sc", sections);

      // sections.sections.push({
      //   id: "the-new-york-times",
      //   name: "The New York Times",
      // });

      // updateValues({ sections: sources.sources.map((source) => source.id) });

      return sections;
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
    <div className="relative z-50">
      <div className={cn("flex flex-row w-full justify-end gap-10")}>
        <div className="flex flex-col gap-2 w-full max-w-[300px]">
          <Input
            placeholder="Author name"
            onChange={useDebounce(
              (e) => updateValues({ author: e.target.value }),
              500
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[300px]">
          {/* <h1 className="text-lg text-foreground">Search by category</h1> */}
          <Select
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
              {/* {sections?.map((section) => (
              <SelectItem key={section.} value={category}>
                {category}
              </SelectItem>
            ))} */}
            </SelectContent>
          </Select>
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

      <Menubar className="flex md:hidden justify-center items-center">
        <MenubarMenu>
          <MenubarTrigger>
            <Menu className="text-foreground px-0" size={24} />
          </MenubarTrigger>
          <MenubarContent className="flex flex-col gap-2 items-center mr-4">
            <MenubarItem>
              <Link href={"/"}>Home</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={"/articles-search"}>Articles Search</Link>
            </MenubarItem>
            <MenubarItem>
              <ModeToggle />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
