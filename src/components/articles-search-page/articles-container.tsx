"use client";
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles";
import { useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";
import Article from "./article";

export default function ArticlesContainer() {
  const loadMoreRef = useRef(null);

  const {
    data: articles,
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
    <div className="pb-10 relative w-full flex flex-col">
      {/* <OrderBy value={filterValues.orderBy} updateValues={updateValues} /> */}
      <div className="max-h-screen w-full px-4">
        {isPending ? (
          <Spinner className="mt-10" />
        ) : (
          <div className="w-full flex flex-col gap-4 items-center">
            {(articles?.pages.flat() ?? [])?.map((article) => (
              <Article key={article.title} data={article} />
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
