import { api } from '@/app/api/clients/ky';
import { JiraConfig } from '@/settings/types';

import { ReviewCreateRequest, ReviewHistoryResponse, ReviewMessageRequest, ReviewResponse } from './reviews.types';
import { downloadBlob, generateFormData } from './utils';

export const REVIEWS_ENDPOINT = 'requirements-analysis/reviews';

export async function createReview(reqData: ReviewCreateRequest): Promise<ReviewResponse> {
  const body = generateFormData(reqData);
  const data = await api
    .post<ReviewResponse>(REVIEWS_ENDPOINT, {
      body,
    })
    .json();

  return data;
}

export async function sendMessageToReview(reviewId: string, reqData: ReviewMessageRequest): Promise<ReviewResponse> {
  const body = generateFormData(reqData);
  const data = await api
    .post<ReviewResponse>(`${REVIEWS_ENDPOINT}/${reviewId}/posts`, {
      body,
    })
    .json();

  return data;
}

export async function getReviewHistory(reviewId: string): Promise<ReviewResponse[]> {
  const data = await api.get<ReviewHistoryResponse>(`${REVIEWS_ENDPOINT}/${reviewId}/posts`).json();
  return data.posts;
}

export async function publishReview(reviewId: string, jiraConfig: JiraConfig): Promise<number> {
  const { status } = await api.post(`${REVIEWS_ENDPOINT}/${reviewId}/publish`, { json: { jiraConfig } });
  return status;
}

export async function downloadReviewFile(reviewId: string, fileName: string): Promise<void> {
  const data = await api.get(`${REVIEWS_ENDPOINT}/${reviewId}/files/${fileName}`).blob();

  downloadBlob(data, fileName);
}
