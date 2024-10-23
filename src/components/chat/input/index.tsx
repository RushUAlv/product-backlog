import { ChangeEvent, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { IconButton, TextField } from '@mui/material';

type Props = {
  value: string;
  disabled?: boolean;
  onFileUpload?: (files: File[]) => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const ChatInput = ({ value, disabled, onSubmit, onFileUpload, onChange }: Props) => {
  const { open, acceptedFiles } = useDropzone();

  useEffect(() => {
    onFileUpload?.(acceptedFiles);
  }, [acceptedFiles, onFileUpload]);

  const onMessageChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      onChange(value);
    },
    [onChange]
  );

  return (
    <TextField
      autoFocus
      className="w-full bg-[var(--dxc-white)] rounded"
      sx={{
        '& .Mui-focused': {
          '& fieldset.MuiOutlinedInput-notchedOutline': { border: 'none', borderWidth: 0 },
        },
        '& .MuiInputBase-root': {
          paddingRight: 0,
        },
        '& fieldset': { border: 'none' },
        '&:hover': {
          '& fieldset': { border: '1px solid var(--smoky)' },
        },
        '&.Mui-focused fieldset': {
          border: 'none',
        },
      }}
      value={value}
      onChange={onMessageChange}
      placeholder="Write message here"
      onKeyDown={(e) => {
        if (!disabled && e.key === 'Enter') {
          onSubmit();
        }
      }}
      slotProps={{
        input: {
          startAdornment: onFileUpload && (
            <IconButton onClick={open} edge="start" sx={{ color: 'var(--black)' }}>
              <AttachFileIcon />
            </IconButton>
          ),
          endAdornment: (
            <div
              className={`flex flex-col justify-center content-center rounded-r h-full w-12 pr-3 ml-2 border-l border-[var(--main-bg)] ${disabled ? 'bg-transparent' : 'bg-[var(--dxc-purple)]'}`}
            >
              <IconButton
                sx={{ color: disabled ? 'inherit' : 'white', borderRadius: 0 }}
                onClick={onSubmit}
                edge="end"
                disabled={disabled}
              >
                <SendOutlinedIcon />
              </IconButton>
            </div>
          ),
        },
      }}
    />
  );
};
