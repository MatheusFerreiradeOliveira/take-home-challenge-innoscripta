import { NewsFilters } from "@/types/filters";
import { create } from "zustand";

export type TuseFiltersData = NewsFilters & {
  setKeyword: (value: Partial<NewsFilters>) => void;
  setCategory: (value: Partial<NewsFilters>) => void;
  setOrderBy: (value: Partial<NewsFilters>) => void;
  setInitialDate: (value: Partial<NewsFilters>) => void;
  setFinalDate: (value: Partial<NewsFilters>) => void;
};

export const useFiltersData = create<TuseFiltersData>((set) => ({
  keyword: "",
  setKeyword: (value: Partial<NewsFilters>) =>
    set(() => ({ keyword: value.keyword })),
  category: "",
  setCategory: (value: Partial<NewsFilters>) =>
    set(() => ({ category: value.category })),
  orderBy: "newest",
  setOrderBy: (value: Partial<NewsFilters>) =>
    set(() => ({ orderBy: value.orderBy })),
  initialDate: "",
  setInitialDate: (value: Partial<NewsFilters>) =>
    set(() => ({ initialDate: value.initialDate })),
  finalDate: "",
  setFinalDate: (value: Partial<NewsFilters>) =>
    set(() => ({ finalDate: value.finalDate })),
}));
