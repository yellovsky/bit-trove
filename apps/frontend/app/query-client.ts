// global modules
import { QueryClient } from '@tanstack/react-query';

const MINUTE = 60 * 1000;

const SERVER_STALE_TIME = MINUTE;
const CLIENT_STALE_TIME = Infinity;

const SERVER_GC_TIME = 5 * MINUTE;
const CLIENT_GC_TIME = 30 * MINUTE;

let queryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: typeof window === 'undefined' ? SERVER_GC_TIME : CLIENT_GC_TIME,
          retry: false,
          staleTime: typeof window === 'undefined' ? SERVER_STALE_TIME : CLIENT_STALE_TIME,
        },
      },
    });
  }

  return queryClient;
};
