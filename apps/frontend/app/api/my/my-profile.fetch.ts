// global modules
import { annotateSrv } from '@repo/runtime';
import type { ProfileResponse } from '@repo/api-models';
import type { QueryClient } from '@tanstack/react-query';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { runtime } from '~/utils/runtime';
import { type MakeQueryFn, makeUseQuery } from '~/api/query';

// local modules
import { type TokenizedMyProfileQKey, tokenizeMyProfileQKey } from './my-profile.query-key';

const FETCH_MY_PROFILEQUERY_TOKEN = 'my_profile';

const fetchMyProfileEP: EndpointFn<ProfileResponse, unknown> =
  apiClient =>
  ({ signal }) =>
    apiClient
      .get<ProfileResponse>('/v1/my/profile', { signal })
      .pipe(annotateSrv('fetchMyProfileEP'));

type FetcMyProfileQKey = TokenizedMyProfileQKey<typeof FETCH_MY_PROFILEQUERY_TOKEN, void>;

const makeFetchRecipeSegmentListQKey = tokenizeMyProfileQKey(FETCH_MY_PROFILEQUERY_TOKEN)<void>;

const fetchMyProfileQFn: MakeQueryFn<ProfileResponse, FetcMyProfileQKey> = apiClient => {
  const fetchFn = fetchMyProfileEP(apiClient);
  return ({ signal }) => runtime.runPromise(fetchFn({ params: undefined, signal }));
};

export const useMyProfileQuery = makeUseQuery({
  makeQueryFn: fetchMyProfileQFn,
  makeQueryKey: makeFetchRecipeSegmentListQKey,
});

export const setMyProfileResponseQuery = (
  queryClient: QueryClient,
  response: ProfileResponse | undefined,
) => {
  const queryKey: FetcMyProfileQKey = ['my_profile', 'my_profile', undefined];
  if (!response) queryClient.removeQueries({ queryKey });
  else queryClient.setQueryData(queryKey, response);
};
