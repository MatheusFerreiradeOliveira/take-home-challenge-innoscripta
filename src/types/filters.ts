export interface NewsFilters {
  keyword: string;
  category: string;
  initialDate: string;
  finalDate: string;
  orderBy: "newest" | "oldest";
}
