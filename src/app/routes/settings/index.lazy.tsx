import { createLazyFileRoute } from '@tanstack/react-router';

import { SettingsPage } from '@/settings/pages/settings';

export const Route = createLazyFileRoute('/settings/')({
  component: Settings,
});

function Settings() {
  return <SettingsPage />;
}
