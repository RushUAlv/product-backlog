import { createLazyFileRoute } from '@tanstack/react-router';

import { ReviewCreatorPage } from '@/reviews/pages/review-creator';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return <ReviewCreatorPage />;
}
