"use client";
import { useFilters } from "@/hooks/useFilters";
import Publication from "./publication";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles";
import { Spinner } from "../ui/spinner";
import { useEffect, useRef } from "react";
import OrderBy from "./order-by";

export default function NewsContainer() {
  const { values: filterValues, updateValues } = useFilters();
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
    <div className="py-10 relative w-full flex flex-col overflow-y-scroll">
      <OrderBy value={filterValues.orderBy} updateValues={updateValues} />
      <div className="max-h-screen w-full">
        {isPending ? (
          <Spinner className="mt-10" />
        ) : (
          <div className="w-full flex flex-col gap-4 items-center mr-[250px]">
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
            {isFetchingNextPage ? <Spinner /> : "Scroll down to load more news"}
          </div>
        )}
      </div>
    </div>
  );
}
