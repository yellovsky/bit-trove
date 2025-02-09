// global modules
import type { QueryClient } from '@tanstack/react-query';

// common modules
import { makeTokenizeQueryKey, type QKey } from '~/api/query';

export const AUTH_QUERY_TOKEN = 'auth';

export type TokenizedAuthQKey<TQKey extends string, TVariables> = QKey<
  typeof AUTH_QUERY_TOKEN,
  TQKey,
  TVariables
>;

export const tokenizeAuthQKey = makeTokenizeQueryKey(AUTH_QUERY_TOKEN);

export const invalidateAuthQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_TOKEN] });
