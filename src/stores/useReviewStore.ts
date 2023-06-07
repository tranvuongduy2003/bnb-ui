import { IReview } from "@/interfaces/IReview";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  reviews: IReview[];
};

type Action = {
  setReviews: (updatedReviews: IReview[]) => void;
};

export const useReviewStore = create(
  immer<State & Action>((set) => ({
    reviews: [],
    setReviews: (updatedReviews: IReview[]) =>
      set((state) => {
        state.reviews = updatedReviews;
      }),
  }))
);
