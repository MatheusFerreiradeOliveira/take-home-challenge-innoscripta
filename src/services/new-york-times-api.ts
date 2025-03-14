import { NewsFilters } from "@/types/filters";
import { NYTArticlesAPIResponse } from "@/types/nyt-api";

const NewYorkTimesService = {
  getArticles: async (
    page: number,
    filters: NewsFilters
  ): Promise<NYTArticlesAPIResponse> => {
    let searchParams = `&page=${page - 1}`;
    if (filters.category) searchParams += `&section_name=${filters.category}`;
    if (filters.keyword) searchParams += `&q=${filters.keyword}`;
    if (filters.orderBy) {
      searchParams += `&sort=${filters.orderBy}`;
    }
    if (filters.initialDate) {
      searchParams += `&begin_date=${filters.initialDate}`;
    }
    if (filters.finalDate) {
      searchParams += `&end_date=${filters.finalDate}`;
    }
    return fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}${searchParams}`
    ).then((response) => response.json());
  },
};

export default NewYorkTimesService;
