import { APIErrorInterface } from "@/types/error";
import { FiltersInterface } from "@/types/filters";
import { ResponseGAPISection } from "@/types/guardian-api";

const TheGuardianService = {
  getArticles: (page: number, filters: FiltersInterface) => {
    let searchParams = `&page=${page}`;
    if (filters.category) searchParams += `&section=${filters.category}`;
    if (filters.keyword) searchParams += `&q=${filters.keyword}`;
    if (filters.orderBy) searchParams += `&order-by=${filters.orderBy}`;
    if (filters.initialDate)
      searchParams += `&from-date=${filters.initialDate}`;
    if (filters.finalDate) searchParams += `&to-date=${filters.finalDate}`;
    return fetch(
      `https://content.guardianapis.com/search?api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY}${searchParams}`
    );
  },

  getSections: async (): Promise<ResponseGAPISection> => {
    const response = await fetch(
      `https://content.guardianapis.com/sections?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
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

export default TheGuardianService;
