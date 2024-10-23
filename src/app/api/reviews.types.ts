import { MessageOrigin } from '@/reviews/types';

export type ReviewCreateRequest = {
  files: File[];
  content?: string;
};
export type ReviewMessageRequest = {
  files?: File[];
  content: string;
};

export type ReviewResponse = {
  reviewId: string;
  postId: string;
  ts: string;
  origin: MessageOrigin;
  fileNames: string[];
  content: string;
};

export type ReviewHistoryResponse = {
  posts: ReviewResponse[];
};
