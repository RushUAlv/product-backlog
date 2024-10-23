import { ReactElement } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { ChatMessage } from '../chat.types';
import { MessageBox } from '../message-box';

type Props = {
  messages: ChatMessage[];
  isWaitingResponse?: boolean;
  onDownloadFile?: (fileName: string) => void;
};

export const MessageList = ({ messages, onDownloadFile, isWaitingResponse = false }: Props): ReactElement => {
  return (
    <div className="flex flex-col-reverse w-full overflow-y-auto py-8 px-6">
      <div className="flex flex-col gap-6 w-full">
        {messages.map((item) => {
          const { id, position, text, files, date, isPublished } = item;
          return (
            <MessageBox
              key={id}
              isHighlighted={!!isPublished}
              position={position}
              text={text}
              files={files}
              date={date}
              onDownloadFile={onDownloadFile}
            />
          );
        })}
        {isWaitingResponse && (
          <Box className="text-[--dxc-purple]">
            <CircularProgress size={50} color="inherit" />
          </Box>
        )}
      </div>
    </div>
  );
};
