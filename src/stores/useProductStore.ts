import { IProduct } from "@/interfaces/IProduct";
import { create } from "zustand";

type State = {
  products: IProduct[];
};

type Action = {
  setProducts: (products: IProduct[]) => void;
};

export const useProductStore = create<State & Action>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) =>
    set(() => ({ products: [...products] })),
}));
