import { NewsFilters } from "@/types/filters";

const TheGuardianService = {
  getArticles: (page: number, filters: NewsFilters) => {
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
};

export default TheGuardianService;
