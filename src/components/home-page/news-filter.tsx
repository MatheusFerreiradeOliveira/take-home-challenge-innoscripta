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
import { ALL_CATEGORIES_NYT } from "@/utils/functions";

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

      updateValues({ newsSources: sources.sources.map((source) => source.id) });

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
          "flex flex-col items-center w-64 lg:w-80 xl:w-96 bg-background gap-10 py-20 border-r shadow-sm",
          `fixed top-0 left-0 h-full p-4 transition-transform transform z-40`,
          isExpanded ? "pt-20 translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative"
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
          <MultiSelect
            options={
              ALL_CATEGORIES_NYT.map((category) => ({
                label: category,
                value: category,
              })) || []
            }
            onValueChange={useDebounce(
              (e) => updateValues({ categories: e }),
              500
            )}
            defaultValue={values.categories}
            placeholder="Select categories"
            variant="inverted"
            maxCount={3}
            className="w-full"
          />
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
              onValueChange={(e) => updateValues({ newsSources: e })}
              defaultValue={values.newsSources}
              placeholder="Select sources"
              variant="inverted"
              maxCount={3}
              className="w-full"
            />
          )}
        </div>
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
