import { ICategory } from "@/interfaces/ICategory";
import { create } from "zustand";

type State = {
  categories: ICategory[];
};

type Action = {
  setCategories: (categories: ICategory[]) => void;
};

export const categoriestore = create<State & Action>((set) => ({
  categories: [],
  setCategories: (categories: ICategory[]) =>
    set(() => ({ categories: [...categories] })),
}));
