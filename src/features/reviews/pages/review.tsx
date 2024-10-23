import { ReactElement, useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { downloadReviewFile } from '@/app/api/reviews';
import { MainLayout } from '@/app/layouts/main';
import { ChatMessage } from '@/components/chat/chat.types';
import { ChatInput } from '@/components/chat/input';
import { MessageList } from '@/components/chat/message-list';

import { useGetReviewId } from '../hooks/use-get-review-id';
import { useIsLastMessageByAgent } from '../hooks/use-is-last-message-by-agent';
import { useIsPublishing } from '../hooks/use-is-publishing';
import { useReviewMutationsInProgress } from '../hooks/use-review-mutations-in-progress';
import { useSendMessage } from '../mutations';
import { reviewsKeys, useMessages } from '../queries';
import { ReviewMessage } from '../types';

const useMessageList = (id: string): ChatMessage[] => {
  const messages = useMessages(id);
  const messageList: ChatMessage[] = messages.map((item: ReviewMessage) => {
    const { fileNames, content, origin, postId, ts, isPublished } = item;
    const isSystemMessage = origin === 'AGENT';

    return {
      id: postId || ts,
      position: isSystemMessage ? 'left' : 'right',
      files: fileNames,
      text: content,
      date: ts,
      isPublished,
    };
  });

  return messageList;
};

export const ReviewPage = (): ReactElement => {
  const reviewId = useGetReviewId();
  const messageList = useMessageList(reviewId);
  const sendMessageMutation = useSendMessage(reviewId);
  const isWaitingResponse = useReviewMutationsInProgress();
  const isPublishing = useIsPublishing(reviewId);
  const isLastMessageByServer = useIsLastMessageByAgent(reviewId);

  const [message, setMessage] = useState('');

  const { isLoading } = useQuery<ReviewMessage[]>({
    queryKey: reviewsKeys.detail(reviewId),
  });

  const onMessageChange = useCallback((value: string) => {
    setMessage(value);
  }, []);

  const onSendMessage = useCallback(() => {
    if (reviewId) {
      const data: ReviewMessage & { fileNames: File[] } = {
        reviewId,
        content: message,
        fileNames: [],
        postId: '',
        ts: new Date().toISOString(),
        origin: 'USER',
      };

      sendMessageMutation.mutate(data);
    }
    setMessage('');
  }, [message, reviewId, sendMessageMutation]);

  const onDownloadFile = useCallback(
    (fileName: string) => {
      if (reviewId) {
        downloadReviewFile(reviewId, fileName);
      }
    },
    [reviewId]
  );

  return (
    <MainLayout>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-1 justify-center rounded-b mb-4 overflow-auto w-full bg-[var(--mischka)]">
          <MessageList
            messages={messageList}
            isWaitingResponse={isLoading || isWaitingResponse}
            onDownloadFile={onDownloadFile}
          />
        </div>

        <ChatInput
          value={message}
          onChange={onMessageChange}
          disabled={!message || isWaitingResponse || !isLastMessageByServer || isPublishing}
          onSubmit={onSendMessage}
        />
      </div>
    </MainLayout>
  );
};
