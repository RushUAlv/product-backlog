import { useQuery } from '@tanstack/react-query';

import { getReviewHistory } from '@/app/api/reviews';

import { useReviewStore } from './stores/review';
import { ReviewMessage } from './types';

export const reviewsKeys = {
  all: ['reviews'] as const,
  details: () => [...reviewsKeys.all, 'detail'] as const,
  detail: (id: string) => [...reviewsKeys.details(), id] as const,

  createReview: () => [...reviewsKeys.all, 'create-review'] as const,
  sendMessage: (id: string) => [...reviewsKeys.all, 'send-message', id] as const,
  publishReview: (id: string) => [...reviewsKeys.all, 'publish-review', id] as const,
};

export function useMessages(id: string): ReviewMessage[] {
  const { initialReviewMessage } = useReviewStore();
  const query = useQuery<ReviewMessage[]>({
    enabled: id !== '',
    queryKey: reviewsKeys.detail(id),
    queryFn: async () => {
      if (!id) {
        return [];
      }
      const data = await getReviewHistory(id);
      return data;
    },
  });

  const defaultMessages = initialReviewMessage ? [initialReviewMessage] : [];

  return query.data?.length ? query.data : defaultMessages;
}
