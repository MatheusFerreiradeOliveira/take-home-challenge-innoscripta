import { APIErrorInterface } from "@/types/error";
import { FiltersInterface } from "@/types/filters";
import {
  ArticleNewsAPI,
  NewsAPIArticlesResponse,
  NewsAPISourceResponse,
} from "@/types/news-api";

const NewsAPIService = {
  getArticles: async (
    page: number,
    filters: FiltersInterface
  ): Promise<NewsAPIArticlesResponse> => {
    let searchParams = `&page=${page}&pageSize=5&sources=${filters.sources.join(
      ","
    )}&language=en`;
    if (filters.category) searchParams += `&category=${filters.category}`;
    if (filters.keyword) searchParams += `&q=${filters.keyword}`;
    if (filters.orderBy) {
      if (filters.orderBy === "newest") {
        searchParams += `&sortBy=publishedAt`;
      } else {
        searchParams += `&sortBy=relevancy`;
      }
    }
    // if (filters.initialDate) searchParams += `&from=${filters.initialDate}`;
    // if (filters.finalDate) searchParams += `&to=${filters.finalDate}`;

    const response = await fetch(
      `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}${searchParams}`
    );

    if (response.status === 429) {
      let error: APIErrorInterface = {
        response,
        name: "API error",
        message: "Rate limit exceeded, retrying...",
      };

      throw error;
    }

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    let responsejson = await response.json();

    if (filters.author) {
      responsejson = {
        ...responsejson,
        articles: responsejson.articles.filter(
          (article: ArticleNewsAPI) =>
            article.author &&
            article.author
              .toLowerCase()
              .includes((filters.author || "").toLowerCase())
        ),
      };
    }

    return responsejson;
  },

  getSources: async (): Promise<NewsAPISourceResponse> => {
    const response = await fetch(
      `https://newsapi.org/v2/sources?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&languages=en`
    );

    if (response.status === 429) {
      let error: APIErrorInterface = {
        response,
        name: "API error",
        message: "Rate limit exceeded, retrying...",
      };

      throw error;
    }

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  },
};

export default NewsAPIService;
