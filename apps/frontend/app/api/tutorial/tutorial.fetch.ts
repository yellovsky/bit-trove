// global modules
import { Effect } from 'effect';
import type { QueryClient } from '@tanstack/react-query';
import type { FailedResponse, TutorialResponse } from '@repo/api-models';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from '~/api/api-client';
import type { EndpointFn, EndpointQFn } from '~/api/endpoint';
import { getQueryKeyVariables, makeUseQuery } from '~/api/query';

// local modules
import { type TokenizedTutorialQKey, tokenizeTutorialQKey } from './tutorial.query-key';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
const FETCH_TUTORIAL_QUERY_TOKEN = 'tutorial';

export interface FetchTutorialVariables {
  slug: string;
  locale: string;
}

type FetcTutorialQKey = TokenizedTutorialQKey<
  typeof FETCH_TUTORIAL_QUERY_TOKEN,
  FetchTutorialVariables
>;

const makeFetcTutorialListQKey = tokenizeTutorialQKey(
  FETCH_TUTORIAL_QUERY_TOKEN,
)<FetchTutorialVariables>;

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const fetchTutorialEP: EndpointFn<TutorialResponse, FetchTutorialVariables> =
  apiClient =>
  ({ variables, signal }) =>
    apiClient.get<TutorialResponse>(`/v1/tutorials/${variables.slug}`, {
      params: { locale: variables.locale },
      signal,
    });

const fetchTutorialQEP: EndpointQFn<TutorialResponse, FetcTutorialQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    fetchTutorialEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                         U S E   Q U E R Y
// ============================================================================
export const useTutorialQuery = makeUseQuery({
  endpointQFn: fetchTutorialQEP,
  makeQueryKey: makeFetcTutorialListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getTutorialQueryResult = (
  queryClient: QueryClient,
  variables: FetchTutorialVariables,
): Effect.Effect<TutorialResponse, FailedResponse> =>
  Effect.gen(function* () {
    const result = queryClient.getQueryData<TutorialResponse>(makeFetcTutorialListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchTutorialQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchTutorialVariables,
): Effect.Effect<TutorialResponse, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchQuery({
        queryFn: context => runAsyncEffect(fetchTutorialQEP(apiClient)(context)),
        queryKey: makeFetcTutorialListQKey(variables),
      }),
    );

    return yield* getTutorialQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
