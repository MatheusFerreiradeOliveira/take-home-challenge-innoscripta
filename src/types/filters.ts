export interface FiltersInterface {
  author?: string;
  keyword: string;
  category: string;
  orderBy: "newest" | "relevance";
  sections: string[];
  sources: string[];
  initialDate: Date | null;
  finalDate: Date | null;
}
