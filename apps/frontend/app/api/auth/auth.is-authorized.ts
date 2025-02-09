// global modules
import { annotateSrv } from '@repo/runtime';
import type { IsAuthorizedResponse } from '@repo/api-models';
import { Effect, pipe } from 'effect';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { runAsyncEffect } from '~/utils/effect';
import { getQueryKeyVariables, type MakeQueryFn, makeUseQuery } from '~/api/query';

// local modules
import { tokenizeAuthQKey, type TokenizedAuthQKey } from './auth.query-key';

const isAuthorizedEP: EndpointFn<IsAuthorizedResponse, void> =
  apiClient =>
  ({ signal }) =>
    pipe(
      apiClient.get<IsAuthorizedResponse>('/v1/auth/is-authorized', {
        signal,
        withCredentials: true,
      }),
      Effect.tapError(Effect.logError),
    ).pipe(annotateSrv('loginWithEmail'));

const IS_AUTHORIZED_QUERY_TOKEN = 'is_authorized';
type IsAuthorizedQKey = TokenizedAuthQKey<typeof IS_AUTHORIZED_QUERY_TOKEN, void>;
const makeIsAuthorizedQKey = tokenizeAuthQKey(IS_AUTHORIZED_QUERY_TOKEN)<void>;

const makeIsAuthorizedQueryFn: MakeQueryFn<IsAuthorizedResponse, IsAuthorizedQKey> = apiClient => {
  return ({ queryKey, signal }) =>
    runAsyncEffect(isAuthorizedEP(apiClient)({ params: getQueryKeyVariables(queryKey), signal }));
};

export const useIsAuthorizedQuery = makeUseQuery({
  makeQueryFn: makeIsAuthorizedQueryFn,
  makeQueryKey: makeIsAuthorizedQKey,
});
