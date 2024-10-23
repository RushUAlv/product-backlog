import { lazy, Suspense } from 'react';

import { createRootRoute, Outlet } from '@tanstack/react-router';

const isRouterDevToolsEnabled = import.meta.env.VITE_ROUTER_DEV_TOOLS === 'true';

const TanStackRouterDevtools = isRouterDevToolsEnabled
  ? lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    )
  : () => null;

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
