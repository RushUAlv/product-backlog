import { useMutationState } from '@tanstack/react-query';

import { reviewsKeys } from '../queries';

export const useReviewMutationsInProgress = () => {
  const messagesMutationStatusList = useMutationState({
    filters: { mutationKey: reviewsKeys.all, status: 'pending' },
    select: (mutation) => mutation.state.status,
  });

  return !!messagesMutationStatusList.length;
};
