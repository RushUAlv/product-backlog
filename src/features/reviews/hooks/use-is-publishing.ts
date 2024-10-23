import { useMutationState } from '@tanstack/react-query';

import { reviewsKeys } from '../queries';

export const useIsPublishing = (reviewId: string) => {
  const messagesMutationStatusList = useMutationState({
    filters: { mutationKey: reviewsKeys.publishReview(reviewId), status: 'pending' },
    select: (mutation) => mutation.state.status,
  });

  return !!messagesMutationStatusList.length;
};
