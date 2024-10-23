import { ReactNode } from 'react';

import { Box, Container, Toolbar } from '@mui/material';

import { useUiStore } from '@/app/stores/ui';

import { Header } from './header/index';
import { SideMenu } from './side-menu';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const { isDrawerOpen } = useUiStore();

  return (
    <div className="layout main-layout flex bg-[var(--main-bg)] min-h-lvh">
      <Header />

      <SideMenu />

      <Box component="main" className="w-full flex flex-col overflow-hidden h-lvh">
        <Toolbar />
        <div className="flex flex-col flex-1 pt-3 pb-24 overflow-y-auto">
          <Container maxWidth={isDrawerOpen ? 'md' : 'lg'} className="h-full">
            {children}
          </Container>
        </div>
      </Box>
    </div>
  );
};
