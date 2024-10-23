import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
  queries: { refetchOnWindowFocus: false, staleTime: 60_000, gcTime: Infinity },
};

export const queryClient = new QueryClient({ defaultOptions });
