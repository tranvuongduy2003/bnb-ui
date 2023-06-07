import { IProduct } from "@/interfaces/IProduct";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  products: IProduct[];
  product: IProduct | null;
};

type Action = {
  setProduct: (updatedProduct: IProduct) => void;
  setProducts: (updatedProducts: IProduct[]) => void;
};

export const useProductStore = create(
  immer<State & Action>((set) => ({
    product: null,
    products: [],
    setProduct: (updatedProduct: IProduct) =>
      set((state) => {
        state.product = updatedProduct;
      }),
    setProducts: (updatedProducts: IProduct[]) =>
      set((state) => {
        state.products = updatedProducts;
      }),
  }))
);
