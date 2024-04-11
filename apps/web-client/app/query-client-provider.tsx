// global modules
import { type FC, type PropsWithChildren, useState } from 'react';

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderOriginal,
} from '@tanstack/react-query';

const STALE_TIME = 60 * 1000;
const GC_TIME = 30 * 60 * 1000;

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { gcTime: GC_TIME, staleTime: STALE_TIME } } })
  );

  return <QueryClientProviderOriginal client={queryClient}>{children}</QueryClientProviderOriginal>;
};
