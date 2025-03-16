import { APIErrorInterface } from "@/types/error";
import { FiltersInterface } from "@/types/filters";
import { NYTArticlesAPIResponse } from "@/types/nyt-api";
import dayjs from "dayjs";

const NewYorkTimesService = {
  getArticles: async (
    page: number,
    filters: FiltersInterface
  ): Promise<NYTArticlesAPIResponse> => {
    let searchParams = `&page=${page - 1}&rows=5`;

    if (filters.author || filters.categories.length) {
      searchParams += "&fq=";
      if (filters.author) {
        searchParams += `byline:("${filters.author}")`;

        if (filters.categories.length) searchParams += " AND ";
      }
      if (filters.categories.length) {
        searchParams += `section_name:(${filters.categories
          .map((category) => `"${category}"`)
          .join(",")})`;
      }
    }

    if (filters.keyword) searchParams += `&q=${filters.keyword}`;
    if (filters.orderBy) {
      searchParams += `&sort=${filters.orderBy}`;
    }
    if (filters.initialDate) {
      const formattedDate = dayjs(filters.initialDate)
        .format("YYYY/MM/DD")
        .replaceAll("/", "");
      searchParams += `&begin_date=${formattedDate}`;
    }
    if (filters.finalDate) {
      const formattedDate = dayjs(filters.finalDate)
        .format("YYYY/MM/DD")
        .replaceAll("/", "");
      searchParams += `&end_date=${formattedDate}`;
    }

    const response = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}${searchParams}`
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

export default NewYorkTimesService;
