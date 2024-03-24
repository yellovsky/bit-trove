// global modules
import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 60 * 1000;

const SERVER_GC_TIME = 5 * 1000;
const CLIENT_GC_TIME = 30 * 60 * 1000;

let queryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: STALE_TIME,
          gcTime: typeof window === 'undefined' ? SERVER_GC_TIME : CLIENT_GC_TIME,
        },
      },
    });
  }

  return queryClient;
};
