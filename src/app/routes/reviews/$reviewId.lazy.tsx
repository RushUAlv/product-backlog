import { createLazyFileRoute } from '@tanstack/react-router';

import { ReviewPage } from '@/reviews/pages/review';

export const Route = createLazyFileRoute('/reviews/$reviewId')({
  component: Review,
});

function Review() {
  return <ReviewPage />;
}