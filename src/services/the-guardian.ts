import { APIErrorInterface } from "@/types/error";
import { FiltersInterface } from "@/types/filters";
import { GAPISectionResponse, GAPIArticleesponse } from "@/types/guardian-api";

const TheGuardianService = {
  getArticles: async (
    page: number,
    filters: FiltersInterface
  ): Promise<GAPIArticleesponse> => {
    let searchParams = `&page=${page}&type=article`;
    if (filters.sections.length)
      searchParams += `&section=${filters.sections.join(",")}`;
    if (filters.keyword) searchParams += `&q="${filters.keyword}"`;
    if (filters.orderBy) searchParams += `&order-by=${filters.orderBy}`;
    if (filters.initialDate)
      searchParams += `&from-date=${filters.initialDate}`;
    if (filters.finalDate) searchParams += `&to-date=${filters.finalDate}`;

    const response = await fetch(
      `https://content.guardianapis.com/search?api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY}${searchParams}`
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

  getSections: async (): Promise<GAPISectionResponse> => {
    const response = await fetch(
      `https://content.guardianapis.com/sections?api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY}`
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
