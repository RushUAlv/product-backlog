export type Position = 'left' | 'right';

export type ChatMessage = {
  id: string;
  position: Position;
  text?: string;
  files?: File[] | string[];
  date?: string;
  isPublished?: boolean;
};
