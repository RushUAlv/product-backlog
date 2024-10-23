import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { ReviewCreateRequest } from '@/app/api/reviews.types';
import { MainLayout } from '@/app/layouts/main';
import { ChatInput } from '@/components/chat/input';
// import { FileList } from '@/components/file-list';
import { FileUploader } from '@/components/file-uploader';

import { useCreateReview } from '../mutations';
import { useReviewActions } from '../stores/review';

export const ReviewCreatorPage = (): ReactElement => {
  const navigate = useNavigate({ from: '/' });
  const createReviewMutation = useCreateReview();
  const { reset } = useReviewActions();

  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    reset();
  }, [reset]);

  const isFormValid = useMemo(() => {
    return !!files.length;
  }, [files]);

  const onMessageChange = useCallback((value: string) => {
    setMessage(value);
  }, []);

  const onDropZoneUpload = useCallback(
    (files: File[]) => {
      const data: ReviewCreateRequest = {
        content: '',
        files,
      };

      setFiles(files);
      createReviewMutation.mutate(data);
      navigate({ to: '/reviews' });
    },
    [createReviewMutation, navigate]
  );

  const onFileUpload = useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  const onSubmit = useCallback(() => {
    const data: ReviewCreateRequest = {
      content: message,
      files,
    };

    createReviewMutation.mutate(data);
    navigate({ to: '/reviews' });
  }, [files, message, navigate, createReviewMutation]);

  return (
    <MainLayout>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-1 justify-center my-4 w-full">
          <FileUploader multiple={false} onDrop={onDropZoneUpload} supportedFormats={['PDF', 'DOCX']} maxFileSize={5} />
        </div>

        <ChatInput
          value={message}
          onChange={onMessageChange}
          disabled={!isFormValid}
          onFileUpload={onFileUpload}
          onSubmit={onSubmit}
        />
      </div>
    </MainLayout>
  );
};
