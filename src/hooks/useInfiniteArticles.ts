import NewsAPIService from "@/services/news-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFiltersData } from "./useFiltersData";
import { usePage } from "./usePage";
import { NewsFilters } from "@/types/filters";
import NewYorkTimesService from "@/services/new-york-times-api";
import { isNewsAPIResponse } from "@/types/news-api";

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
        return response.articles;
      } else {
        return response.response.docs;
      }
    })
  );

  return responses.flat();
};

export function useInfiniteArticles() {
  const { page } = usePage();
  const { values } = useFiltersData();

  return useInfiniteQuery({
    queryKey: ["infinite-articles", page, values],
    queryFn: () => fetchArticles({ page, values }),
    initialPageParam: page,
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });
}
