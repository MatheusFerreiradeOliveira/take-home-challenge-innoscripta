export interface NewsFilters {
  keyword: string;
  category: string;
  initialDate: Date | null;
  finalDate: Date | null;
  orderBy: "newest" | "relevance";
  sources: string[];
}
