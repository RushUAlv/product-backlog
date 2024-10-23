import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { queryClient } from './api/clients/react-query';
import ConsecutiveSnackbars from './notifications';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  const isMockEnabled = import.meta.env.VITE_MOCK_API === 'true';

  if (!isMockEnabled) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const dxcPurple = '#5f249f';
const dxcGreen = '#6cc24a';

const theme = createTheme({
  palette: {
    primary: {
      main: dxcPurple,
    },
    success: {
      main: dxcGreen,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'var(--notification-success)',
          color: 'white',
        },
        standardError: {
          backgroundColor: 'var(--notification-error)',
          color: 'white',
        },
        // standardWarning: {
        //   backgroundColor: 'orange',
        //   color: 'white',
        // },
        // standardInfo: {
        //   backgroundColor: 'grey',
        //   color: 'black',
        // },
      },
    },
  },
});

enableMocking().then(() => {
  const rootElement = document.getElementById('root')!;
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <ConsecutiveSnackbars />
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </StrictMode>
    );
  }
});
