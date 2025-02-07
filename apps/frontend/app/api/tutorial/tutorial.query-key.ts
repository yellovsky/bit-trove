// global modules
import type { QueryClient } from '@tanstack/react-query';

// common modules
import { makeTokenizeQueryKey, type QKey } from '~/api/query';

export const TUTORIAL_QUERY_TOKEN = 'tutorial';

export type TokenizedTutorialQKey<TQKey extends string, TVariables> = QKey<
  typeof TUTORIAL_QUERY_TOKEN,
  TQKey,
  TVariables
>;

export const tokenizeTutorialQKey = makeTokenizeQueryKey(TUTORIAL_QUERY_TOKEN);

export const invalidateTutorialQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [TUTORIAL_QUERY_TOKEN] });
