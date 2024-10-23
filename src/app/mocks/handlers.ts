import { delay, http, HttpResponse } from 'msw';

import { REVIEWS_ENDPOINT } from '../api/reviews';

// const delayTime = 'real';
const delayTime = 2000;

let isErrorNotification = false;

export const handlers = [
  http.post(`${REVIEWS_ENDPOINT}`, async () => {
    await delay(delayTime);
    return HttpResponse.json({
      reviewId: 'f45784dc-61b3-4cfb-931d-4e0e09c656ef',
      postId: 'f2e131e0-891b-4c9e-8cda-694b3cd7e7f6',
      ts: '2024-10-01T12:46:46.162009601Z',
      origin: 'AGENT',
      fileNames: ['review-report-data-1727786806162.csv'],
      content: null,
    });
  }),
  http.post(`${REVIEWS_ENDPOINT}/:reviewId/posts`, async ({ params }) => {
    await delay(delayTime);
    return HttpResponse.json({
      reviewId: params.reviewId,
      postId: 'f2e131e0-891b-4c9e-8cda-694b3cd7123',
      ts: '2024-10-01T12:46:46.162009601Z',
      origin: 'AGENT',
      fileNames: ['review-report-data-1727786806162.csv'],
      content: null,
    });
  }),
  http.get(`${REVIEWS_ENDPOINT}/:reviewId/posts`, async ({ params }) => {
    await delay(delayTime);
    return HttpResponse.json({
      posts: [
        {
          reviewId: params.reviewId,
          postId: 'f2e131e0-891b-4c9e-8cda-694b3cd7125',
          ts: '2024-10-01T10:46:46.162009601Z',
          origin: 'USER',
          fileNames: ['BRD.pdf'],
          content: 'Generate backlog items',
        },
        {
          reviewId: params.reviewId,
          postId: 'f2e131e0-891b-4c9e-8cda-694b3cd7123',
          ts: '2024-10-01T12:46:46.162009601Z',
          origin: 'AGENT',
          fileNames: ['review-report-data-1727786806162.csv'],
          content: null,
        },
      ],
    });
  }),
  http.post(`${REVIEWS_ENDPOINT}/:reviewId/publish`, async () => {
    await delay(delayTime);
    isErrorNotification = isErrorNotification ? false : true;
    return isErrorNotification ? HttpResponse.text() : HttpResponse.error();
  }),
  http.get(`${REVIEWS_ENDPOINT}/:reviewId/files/:fileName`, async () => {
    await delay(delayTime);
    const buffer = await fetch(`/public/review-mock.csv`).then((response) => response.arrayBuffer());

    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  }),
];
