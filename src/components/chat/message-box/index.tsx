import { ReactElement, useCallback, useState } from 'react';

import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { downloadBlob } from '@/app/api/utils';

import { FileList } from '../../file-list';
import { Position } from '../chat.types';
import { MessageBoxMenu } from './menu';

type Props = {
  position: Position;
  isHighlighted: boolean;
  text?: string;
  files?: File[] | string[];
  date?: string;
  onDownloadFile?: (fileName: string) => void;
};

const getTime = (value?: string): string => {
  if (!value) {
    return '';
  }

  const date = new Date(Date.parse(value));
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

export const MessageBox = ({
  position = 'right',
  text,
  files,
  date,
  isHighlighted,
  onDownloadFile,
}: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDownload = useCallback(() => {
    const fileToDownload = files?.[0];
    handleClose();
    if (onDownloadFile && fileToDownload) {
      if (typeof fileToDownload === 'string') {
        onDownloadFile(fileToDownload);
      } else {
        downloadBlob(fileToDownload, fileToDownload.name);
      }
    }
  }, [files, onDownloadFile]);

  if (!text && !files?.length) {
    return <></>;
  }

  const isLeft = position === 'left';
  const time = getTime(date);

  return (
    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`flex flex-col gap-2 max-w-[75%] p-4 rounded bg-[var(--dxc-white)]  ${isHighlighted ? 'border-2 border-[var(--dxc-purple)]' : ''}`}
      >
        <div className="flex">
          <div className="flex flex-col pr-2">
            {text && <div className="break-words text-wrap">{text}</div>}
            {!!files?.length && <FileList files={files} onDownloadFile={onDownloadFile} />}
          </div>

          <div className="flex">
            {isHighlighted && (
              <FileDownloadDoneOutlinedIcon
                sx={{
                  color: 'var(--dxc-purple)',
                }}
              />
            )}
            <MoreVertIcon
              sx={{
                cursor: 'pointer',
                color: 'var(--dusty-grey)',
                '&:hover': {
                  color: 'var(--dxc-purple)',
                },
              }}
              onClick={handleClick}
            />
          </div>
        </div>

        {time && <div className="flex justify-end text-[var(--dusty-grey)]">{time}</div>}
      </div>
      {open && (
        <MessageBoxMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          isServerMessage={isLeft}
          onDownloadFile={files?.length ? onDownload : undefined}
        />
      )}
    </div>
  );
};
