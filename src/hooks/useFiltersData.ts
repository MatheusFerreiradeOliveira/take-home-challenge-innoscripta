import { NewsFilters } from "@/types/filters";
import { create } from "zustand";

export type TuseFiltersData = {
  values: NewsFilters;
  updateValues: (newValues: Partial<NewsFilters>) => void;
};

export const useFiltersData = create<TuseFiltersData>((set) => ({
  values: {
    keyword: "",
    category: "",
    orderBy: "newest",
    initialDate: null,
    finalDate: null,
    sources: [],
  },
  updateValues: (newValues: Partial<NewsFilters>) =>
    set((state) => {
      return {
        values: { ...state.values, ...newValues },
      };
    }),
}));
