import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryClient } from '@/app/api/clients/react-query';
import { useNotificationActions } from '@/app/stores/notification';
import { publishReviewMutation as publishReviewMutationFn } from '@/reviews/mutations';

import { reviewsKeys } from '../queries';
import { ReviewMessage } from '../types';
import { useGetReviewId } from './use-get-review-id';

export const usePublish = (reviewIdParam?: string) => {
  const { addMessage } = useNotificationActions();

  const reviewIdValue = reviewIdParam !== undefined ? reviewIdParam : '';
  const storedReviewId = useGetReviewId();
  const reviewId = reviewIdValue || storedReviewId;

  const publishReviewMutation = useMutation({
    mutationKey: reviewsKeys.publishReview(reviewId),
    mutationFn: publishReviewMutationFn,
    onSuccess: () => {
      queryClient.setQueryData<ReviewMessage[]>(reviewsKeys.detail(reviewId), (state) => {
        if (!state) {
          return state;
        }
        const newState = produce(state, (draft) => {
          const serverMessage = draft.findLast((item) => item.origin === 'AGENT');
          if (serverMessage) {
            serverMessage.isPublished = true;
          }
        });
        return newState;
      });
      addMessage({ message: 'Success', text: 'File successfully published in Jira', severity: 'success' });
    },
    onError: () => {
      addMessage({
        message: 'Publish To Jira Failed',
        text: 'Please check the Jira configuration or contact the administrator',
        severity: 'error',
      });
    },
  });

  const onPublish = useCallback(() => {
    const jiraSettingsJson = localStorage.getItem('jiraSettings');
    let jiraConfig = null;

    if (jiraSettingsJson) {
      try {
        const settings = JSON.parse(jiraSettingsJson);
        jiraConfig = settings;
      } catch (error) {
        console.error(error);
      }
    }

    if (reviewId && jiraConfig) {
      const data = { reviewId, ...jiraConfig };
      publishReviewMutation.mutate(data);
    }
  }, [publishReviewMutation, reviewId]);

  return { onPublish };
};
