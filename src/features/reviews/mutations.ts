import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/app/api/clients/react-query';
import { createReview, publishReview, sendMessageToReview } from '@/app/api/reviews';
import { ReviewCreateRequest, ReviewMessageRequest, ReviewResponse } from '@/app/api/reviews.types';
import { JiraConfig } from '@/settings/types';

import { reviewsKeys } from './queries';
import { useReviewStore } from './stores/review';
import { ReviewMessage } from './types';

export function useCreateReview() {
  return useMutation({
    mutationKey: reviewsKeys.createReview(),
    mutationFn: createReviewMutation,
    onMutate: async (message) => {
      useReviewStore.getState().actions.setInitialReviewMessage(message);
    },
    onError: () => {
      useReviewStore.getState().actions.resetInitialReviewMessage();
    },
    onSuccess: (newMessage) => {
      const firstUserMessage: ReviewMessage = useReviewStore.getState().initialReviewMessage!;
      useReviewStore.getState().actions.setReviewId(newMessage.reviewId);
      useReviewStore.getState().actions.resetInitialReviewMessage();
      firstUserMessage.reviewId = newMessage.reviewId;

      queryClient.setQueryData(reviewsKeys.detail(newMessage.reviewId), () => {
        return [firstUserMessage, newMessage];
      });
    },
  });
}

export function useSendMessage(reviewId: string) {
  return useMutation({
    mutationKey: reviewsKeys.sendMessage(reviewId),
    mutationFn: sendMessageMutation,
    onMutate: async (message) => {
      await queryClient.cancelQueries({ queryKey: reviewsKeys.detail(message.reviewId) });
      const previousMessages: ReviewMessage[] = queryClient.getQueryData(reviewsKeys.detail(message.reviewId)) || [];

      queryClient.setQueryData<ReviewMessage[]>(reviewsKeys.detail(message.reviewId), (previous) => {
        const messages = Array.isArray(previous) ? previous : [];
        return [...messages, message];
      });

      return { previousMessages };
    },
    onError: (_err, newMessage, context) => {
      queryClient.setQueryData(reviewsKeys.detail(newMessage.reviewId), context!.previousMessages);
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData(reviewsKeys.detail(newMessage.reviewId), (previous) => {
        const messages = Array.isArray(previous) ? previous : [];
        return [...messages, newMessage];
      });
    },
  });
}

export function usePublishReview(reviewId: string) {
  return useMutation({
    mutationKey: reviewsKeys.publishReview(reviewId),
    mutationFn: publishReviewMutation,
  });
}

async function createReviewMutation(data: ReviewCreateRequest): Promise<ReviewResponse> {
  return createReview(data);
}

async function sendMessageMutation(data: ReviewMessage & { fileNames: File[] }): Promise<ReviewResponse> {
  const message: ReviewMessageRequest = {
    files: data.fileNames,
    content: data.content,
  };

  return sendMessageToReview(data.reviewId, message);
}

export async function publishReviewMutation(data: { reviewId: string } & JiraConfig): Promise<number> {
  const jiraConfig = {
    baseUrl: data.baseUrl,
    apiToken: data.apiToken,
    projectKey: data.projectKey,
  };

  return publishReview(data.reviewId, jiraConfig);
}
