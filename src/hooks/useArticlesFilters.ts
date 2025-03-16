import { ArticlesFilters, FiltersInterface } from "@/types/filters";
import { create } from "zustand";

export type TuseArticlesFilters = {
  values: ArticlesFilters;
  updateValues: (newValues: Partial<ArticlesFilters>) => void;
};

export const useFilters = create<TuseArticlesFilters>((set) => ({
  values: {
    keyword: "",
    category: "",
    orderBy: "newest",
    sources: [],
    initialDate: null,
    finalDate: null,
  },
  updateValues: (newValues: Partial<FiltersInterface>) =>
    set((state) => {
      return {
        values: { ...state.values, ...newValues },
      };
    }),
}));
