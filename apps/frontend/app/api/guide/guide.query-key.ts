// global modules
import type { QueryClient } from '@tanstack/react-query';

// common modules
import { makeTokenizeQueryKey, type QKey } from '~/api/query';

export const GUIDE_QUERY_TOKEN = 'guide';

export type TokenizedGuideQKey<TQKey extends string, TVariables> = QKey<
  typeof GUIDE_QUERY_TOKEN,
  TQKey,
  TVariables
>;

export const tokenizeGuideQKey = makeTokenizeQueryKey(GUIDE_QUERY_TOKEN);

export const invalidateGuideQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [GUIDE_QUERY_TOKEN] });
