import { create } from "zustand";

export type TusePage = {
  page: number;
  setPage: (newPage: number) => void;
};

export const usePage = create<TusePage>((set) => ({
  page: 1,
  setPage: (newPage: number) => set(() => ({ page: newPage })),
}));
