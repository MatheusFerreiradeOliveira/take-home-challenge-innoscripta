export interface FiltersInterface {
  author?: string;
  keyword: string;
  categories: string[];
  orderBy: "newest" | "relevance";
  sections: string[];
  sources: string[];
  initialDate: Date | null;
  finalDate: Date | null;
}
