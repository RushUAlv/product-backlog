import { create } from 'zustand';

import { ReviewCreateRequest } from '@/app/api/reviews.types';

import { ReviewMessage } from '../types';

type ReviewStoreActionsType = {
  setReviewId: (id: string) => void;
  setInitialReviewMessage: (message: ReviewCreateRequest) => void;
  resetInitialReviewMessage: () => void;
  reset: () => void;
};
type ReviewStoreType = {
  newReviewId: string | null;
  initialReviewMessage: ReviewMessage | null;
  actions: ReviewStoreActionsType;
};

const initialState = {
  newReviewId: null,
  initialReviewMessage: null,
};

export const useReviewStore = create<ReviewStoreType>((set) => ({
  ...initialState,
  actions: {
    setReviewId: (id: string) => set(() => ({ newReviewId: id })),
    setInitialReviewMessage: (message: ReviewCreateRequest) =>
      set(() => {
        const initialReviewMessage: ReviewMessage = {
          reviewId: '',
          content: message.content || '',
          fileNames: message.files,
          postId: '',
          ts: new Date().toISOString(),
          origin: 'USER',
        };

        return { initialReviewMessage };
      }),
    resetInitialReviewMessage: () =>
      set(() => {
        return { initialReviewMessage: null };
      }),
    reset: () => {
      set(initialState);
    },
  },
}));

export const useReviewActions = () => useReviewStore((state) => state.actions);
