import NewsAPIService from "@/services/news-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFiltersData } from "./useFiltersData";
import { NewsFilters } from "@/types/filters";
import NewYorkTimesService from "@/services/new-york-times-api";
import { isNewsAPIResponse } from "@/types/news-api";
import { convertToPublication } from "@/utils/functions";

const fetchArticles = async ({
  page,
  values,
}: {
  page: number;
  values: NewsFilters;
}) => {
  const apis = [
    {
      name: "NewsAPI",
      func: NewsAPIService.getArticles,
    },
    // {
    //   name: "TheGuardian",
    //   func: TheGuardianService.getArticles,
    // },
    {
      name: "NewYorkTimes",
      func: NewYorkTimesService.getArticles,
    },
  ];

  const responses = await Promise.all(
    apis.map(async (api) => {
      const response = await api.func(page, values);

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
    })
  );

  return responses.flat();
};

export function useInfiniteArticles() {
  const { values } = useFiltersData();

  return useInfiniteQuery({
    queryKey: ["infinite-articles", values],
    queryFn: ({ pageParam = 1 }) => fetchArticles({ page: pageParam, values }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}
