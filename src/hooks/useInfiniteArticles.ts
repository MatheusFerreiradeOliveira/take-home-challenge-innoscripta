import NewsAPIService from "@/services/news-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFilters } from "./useFilters";
import { FiltersInterface } from "@/types/filters";
import NewYorkTimesService from "@/services/new-york-times-api";
import { isNewsAPIResponse } from "@/types/news-api";
import { convertToPublication } from "@/utils/functions";

const fetchNews = async ({
  page,
  values,
}: {
  page: number;
  values: FiltersInterface;
}) => {
  let requests = [];

  console.log("srcs", values.sources);

  // remove request if filtering by category, since NewsAPI can't filter by category
  if (
    !Boolean(values.categories.length) &&
    values.sources.some((source) => source !== "the-new-york-times")
  ) {
    requests.push({
      name: "NewsAPI",
      func: NewsAPIService.getArticles,
    });
  }

  if (values.sources.includes("the-new-york-times")) {
    requests.push({
      name: "NewYorkTimes",
      func: NewYorkTimesService.getArticles,
    });
  }

  const responses = await Promise.all(
    requests.map(async (request) => {
      try {
        const response = await request.func(page, values);

        const isNewsApiResponse = isNewsAPIResponse(response);

        if (isNewsApiResponse) {
          return response.articles.map((article) =>
            convertToPublication(article)
          );
        } else {
          return response.response.docs.map((article) =>
            convertToPublication(article)
          );
        }
      } catch (e) {
        return [];
      }
    })
  );

  return responses.flat();
};

export function useInfiniteArticles() {
  const { values } = useFilters();

  return useInfiniteQuery({
    queryKey: ["infinite-articles", values],
    queryFn: ({ pageParam = 1 }) => fetchNews({ page: pageParam, values }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}
