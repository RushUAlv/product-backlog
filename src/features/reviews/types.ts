export type MessageOrigin = 'USER' | 'AGENT';

export type ReviewMessage = {
  reviewId: string;
  postId: string;
  ts: string;
  origin: MessageOrigin;
  fileNames: File[] | string[];
  content: string;
  isPublished?: boolean;
};
