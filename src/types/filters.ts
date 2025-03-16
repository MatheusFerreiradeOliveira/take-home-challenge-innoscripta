export interface FiltersInterface {
  author?: string;
  keyword: string;
  categories: string[];
  orderBy: "newest" | "relevance";
  sections: string[];
  newsSources: string[];
  articlesSources: string[];
  initialDate: Date | null;
  finalDate: Date | null;
}
