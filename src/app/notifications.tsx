import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { Alert, IconButton, Snackbar } from '@mui/material';

import { NotificationMessage, useNotificationActions, useNotificationStore } from './stores/notification';

export default function ConsecutiveSnackbars() {
  const { snackPack } = useNotificationStore();
  const { sliceMessage } = useNotificationActions();

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<NotificationMessage | undefined>(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      sliceMessage();
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open, sliceMessage]);

  const handleClose = (_event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        sx={{
          '&.MuiSnackbar-root': { top: '100px', right: '80px' },
          '& .MuiPaper-root': { paddingTop: 0 },
        }}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert
          severity={messageInfo?.severity || 'info'}
          iconMapping={{
            success: <DownloadDoneIcon fontSize="inherit" sx={{ color: 'white', marginTop: '10px' }} />,
            error: <span className="text-white text-base mt-[10px]">Error:</span>,
          }}
        >
          <div className="flex items-start">
            <div className="flex flex-col mt-2">
              <div className="font-bold text-lg">{messageInfo?.message}</div>
              <div>{messageInfo?.text}</div>
            </div>
            {/* @ts-expect-error mui-issue */}
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: 'white' }} fontSize="small" />
            </IconButton>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
