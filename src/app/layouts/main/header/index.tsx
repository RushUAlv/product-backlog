import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';

import { useUiActions, useUiStore } from '@/app/stores/ui';
import Logo from '@/assets/logo-dxc.svg?react';
import { useGetReviewId } from '@/reviews/hooks/use-get-review-id';
import { useIsLastMessageByAgent } from '@/reviews/hooks/use-is-last-message-by-agent';
import { useIsPublishing } from '@/reviews/hooks/use-is-publishing';
import { usePublish } from '@/reviews/hooks/use-publish';
import { useReviewMutationsInProgress } from '@/reviews/hooks/use-review-mutations-in-progress';

import { UserProfile } from './user-profile';

const appName = import.meta.env.VITE_APP_NAME;

export const Header = () => {
  const navigate = useNavigate();
  const { isDrawerOpen } = useUiStore();
  const { onDrawerChange } = useUiActions();
  const reviewId = useGetReviewId();
  const { onPublish } = usePublish();

  const isWaitingResponse = useReviewMutationsInProgress();
  const isLastMessageByServer = useIsLastMessageByAgent(reviewId);
  const isPublishing = useIsPublishing(reviewId);

  return (
    <AppBar
      component="nav"
      color="transparent"
      elevation={0}
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar
        className="flex justify-between bg-[var(--dxc-white)]"
        sx={{ '@media (min-width: 0px)': { paddingRight: 0, paddingLeft: 0, margin: 0 } }}
      >
        <div className="flex items-center">
          <IconButton
            aria-label="open drawer"
            onClick={onDrawerChange}
            edge="start"
            sx={[
              {
                color: 'var(--white)',
                backgroundColor: 'var(--dxc-purple)',
                margin: 0,
                padding: '22px 28px',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'var(--dxc-purple)',
                },
              },
            ]}
          >
            {isDrawerOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
          </IconButton>

          <Link to="/">
            <Logo />
          </Link>
          <span className="font-bold text-2xl ">|</span>
          <h1 className="ml-3 text-2xl">{appName}</h1>
        </div>
        <div className="flex items-center">
          <div className="flex gap-4 justify-between mx-4">
            <Button
              sx={{ backgroundColor: 'var(--btn-dark-grey)', fontWeight: 'bold' }}
              variant="contained"
              size="large"
              startIcon={<ModeEditOutlinedIcon />}
              onClick={() => navigate({ to: '/' })}
            >
              Start New Review
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled={isWaitingResponse || !isLastMessageByServer || isPublishing}
              onClick={onPublish}
            >
              Publish to JIRA
            </Button>
          </div>
          <div className="mr-20">
            <UserProfile />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};
