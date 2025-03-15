"use client";
import { useFiltersData } from "@/hooks/useFiltersData";
import Publication from "./publication";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles";
import { Spinner } from "./ui/spinner";
import NotFound from "@/app/not-found";
import { useEffect, useRef } from "react";

export default function NewsContainer() {
  const { values: filterValues, updateValues } = useFiltersData();
  const loadMoreRef = useRef(null);

  const {
    data: publications,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteArticles();

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="relative w-full flex flex-col justify-center items-center py-10 overflow-y-scroll">
      <div className="absolute right-2 top-2 flex flex-row items-center w-[250px]">
        <Label className="w-full">Order news by:</Label>
        <Select
          value={filterValues.orderBy}
          onValueChange={(e: "newest" | "relevance") =>
            updateValues({ orderBy: e })
          }
        >
          <SelectTrigger className="">
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
      </div>
      <div>
        {isPending ? (
          <Spinner />
        ) : (
          <div>
            {(publications?.pages.flat() ?? [])?.map((publication) => (
              <Publication key={publication.title} pub={publication} />
            ))}
          </div>
        )}

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-10 w-full text-center text-gray-500"
          >
            {isFetchingNextPage ? <Spinner /> : "Scroll down to load more"}
          </div>
        )}
      </div>
    </div>
  );
}
