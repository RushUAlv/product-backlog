import { useMatch } from '@tanstack/react-router';

import { useReviewStore } from '../stores/review';

export const useGetReviewId = (): string => {
  const { newReviewId } = useReviewStore();
  let reviewId: string = newReviewId || '';

  const match = useMatch({ from: '/reviews/$reviewId', shouldThrow: false });
  if (match) {
    const { params } = match;
    reviewId = params.reviewId;
  }

  return reviewId;
};
