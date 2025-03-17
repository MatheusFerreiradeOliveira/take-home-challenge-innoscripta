import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFilters } from "./useFilters";
import { FiltersInterface } from "@/types/filters";
import NewYorkTimesService from "@/services/new-york-times-api";
import { convertToArticle } from "@/utils/functions";
import TheGuardianService from "@/services/the-guardian";
import { isTheGuardianAPIResponse } from "@/types/guardian-api";

const fetchArticles = async ({
  page,
  values,
}: {
  page: number;
  values: FiltersInterface;
}) => {
  let requests = [];

  if (
    values.keyword &&
    (!values.articlesSources.length ||
      values.articlesSources.includes("the-new-york-times"))
  ) {
    requests.push({
      name: "NewYorkTimes",
      func: NewYorkTimesService.getArticles,
    });
  }

  if (
    values.keyword &&
    (!values.articlesSources.length ||
      values.articlesSources.some((source) => source === "the-guardian-api"))
  ) {
    requests.push({
      name: "TheGuardianAPI",
      func: TheGuardianService.getArticles,
    });
  }

  const responses = await Promise.all(
    requests.map(async (request) => {
      try {
        const response = await request.func(page, values);

        const isGuardianApiResponse = isTheGuardianAPIResponse(response);

        if (isGuardianApiResponse) {
          return response.response.results.map((article) =>
            convertToArticle(article)
          );
        } else {
          return response.response.docs.map((article) =>
            convertToArticle(article)
          );
        }
      } catch (e) {
        return [];
      }
    })
  );

  return responses.flat().sort((a1, a2) => (a1.title < a2.title ? -1 : 1));
};

export function useInfiniteArticles() {
  const { values } = useFilters();

  return useInfiniteQuery({
    queryKey: ["infinite-articles", values],
    queryFn: ({ pageParam = 1 }) => fetchArticles({ page: pageParam, values }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}
