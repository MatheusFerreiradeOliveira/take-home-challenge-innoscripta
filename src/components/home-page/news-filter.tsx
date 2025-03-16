"use client";
import { useFilters } from "@/hooks/useFilters";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import NewsAPIService from "@/services/news-api";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function NewsFilter() {
  const { values, updateValues } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="relative z-50">
      <button
        className={cn(
          "md:hidden p-2 rounded-md fixed  z-50 bg-background hover:bg-foreground border shadow-sm",
          isExpanded ? "top-4 left-4" : "top-20 left-4"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X size={24} className="text-background hover:text-foreground" />
        ) : (
          <div className="flex flex-row gap-2 items-center justify-center">
            <Menu className="text-foreground " size={24} />
            <span className="bg-background text-foreground">Filters</span>
          </div>
        )}
      </button>

      <div
        className={cn(
          "flex flex-col w-[20%] bg-background gap-10 py-20 border-r shadow-sm",
          `fixed top-0 left-0 h-full w-64 p-4 transition-transform transform z-40
          ${isExpanded ? "pt-20 translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64`
        )}
      >
        <div className="flex flex-col gap-2 w-full max-w-[300px]">
          <h1 className="text-lg text-foreground">Search by author</h1>
          <Input
            placeholder="Author name"
            onChange={useDebounce(
              (e) => updateValues({ author: e.target.value }),
              500
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[300px]">
          <h1 className="text-lg text-foreground">Search by category</h1>
          <Input
            placeholder="sports, politics, etc."
            onChange={useDebounce(
              (e) => updateValues({ category: e.target.value }),
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
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}
