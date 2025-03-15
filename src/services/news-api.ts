import { NewsFilters } from "@/types/filters";
import {
  ArticleNewsAPI,
  NewsAPIArticlesResponse,
  NewsAPISource,
  NewsAPISourceResponse,
} from "@/types/news-api";

const NewsAPIService = {
  getArticles: async (
    page: number,
    filters: NewsFilters
  ): Promise<NewsAPIArticlesResponse> => {
    let searchParams = `&page=${page}&pageSize=5&sources=${filters.sources.join(
      ","
    )}`;
    if (filters.category) searchParams += `&category=${filters.category}`;
    if (filters.keyword) searchParams += `&q=${filters.keyword}`;
    if (filters.orderBy) {
      if (filters.orderBy === "newest") {
        searchParams += `&sortBy=publishedAt`;
      } else {
        searchParams += `&sortBy=relevancy`;
      }
    }
    if (filters.initialDate) searchParams += `&from=${filters.initialDate}`;
    if (filters.finalDate) searchParams += `&to=${filters.finalDate}`;
    return fetch(
      `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}${searchParams}`
    ).then((response) => response.json());
  },

  getSources: async (): Promise<NewsAPISourceResponse> => {
    return fetch(
      `https://newsapi.org/v2/sources?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&languages=en`
    ).then((response) => response.json());
  },
};

export default NewsAPIService;
