"use client";
import { useFilters } from "@/hooks/useFilters";
import Publication from "./publication";
import { useInfiniteNews } from "@/hooks/useInfiniteNews";
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
  } = useInfiniteNews();

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
    <div className="py-10 relative w-full flex flex-col overflow-y-scroll pr-0 md:pr-10 lg:pr-40">
      <OrderBy value={filterValues.orderBy} updateValues={updateValues} />
      <div className="max-h-screen w-full px-4">
        {isPending ? (
          <Spinner className="mt-10" />
        ) : (
          <div className="w-full flex flex-col gap-4 items-center">
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
