import { FiltersInterface } from "@/types/filters";
import { create } from "zustand";

export type TuseFilters = {
  values: FiltersInterface;
  updateValues: (newValues: Partial<FiltersInterface>) => void;
};

export const useFilters = create<TuseFilters>((set) => ({
  values: {
    author: "",
    keyword: "",
    categories: [],
    orderBy: "newest",
    newsSources: [],
    articlesSources: [], //"the-guardian-api", "the-new-york-times"
    sections: [],
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
