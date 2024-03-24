'use client';

// global modules
import type { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

// local modules
import { getQueryClient } from '~/src/query-client';

export const Providers: FC<PropsWithChildren> = (props) => (
  <QueryClientProvider {...props} client={getQueryClient()} />
);
