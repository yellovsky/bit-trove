// global modules
import type { QueryClient } from '@tanstack/react-query';

// common modules
import { makeTokenizeQueryKey, type QKey } from '~/api/query';

export const MY_PROFILE_QUERY_TOKEN = 'my_profile';

export type TokenizedMyProfileQKey<TQKey extends string, TVariables> = QKey<
  typeof MY_PROFILE_QUERY_TOKEN,
  TQKey,
  TVariables
>;

export const tokenizeMyProfileQKey = makeTokenizeQueryKey(MY_PROFILE_QUERY_TOKEN);

export const invalidateMyProfileQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [MY_PROFILE_QUERY_TOKEN] });
