import ky from 'ky';

export const api = ky.create({
  timeout: false,
  prefixUrl: import.meta.env.VITE_MOCK_API === 'true' ? undefined : import.meta.env.VITE_API_PBM_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('X-API-KEY', import.meta.env.VITE_API_KEY);
      },
    ],
  },
});
