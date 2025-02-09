// global modules
import { Effect } from 'effect';
import type { FailedResponse, TutorialListFP, TutorialListResponse } from '@repo/api-models';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { initialPageParam } from '~/api/pagination';
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from '~/api/api-client';
import type { EndpointListFn, EndpointListQFn } from '~/api/endpoint';
import { getQueryKeyVariables, makeUseInfiniteListQuery } from '~/api/query';

// local modules
import { type TokenizedTutorialQKey, tokenizeTutorialQKey } from './tutorial.query-key';

// ============================================================================
//                          Q U E R Y   K E Y
// ============================================================================
const FETCH_TUTORIAL_LIST_QUERY_TOKEN = 'tutorial_list';

export type FetchTutorialListVariables = Omit<TutorialListFP, 'page'>;

type FetcTutorialListQKey = TokenizedTutorialQKey<
  typeof FETCH_TUTORIAL_LIST_QUERY_TOKEN,
  FetchTutorialListVariables
>;

const makeFetcTutorialListQKey = tokenizeTutorialQKey(
  FETCH_TUTORIAL_LIST_QUERY_TOKEN,
)<FetchTutorialListVariables>;

// ============================================================================
//                            E N D P O I N T
// ============================================================================
export const fetchTutorialListEP: EndpointListFn<
  TutorialListResponse,
  FetchTutorialListVariables
> =
  apiClient =>
  ({ variables, pageParam, signal }) =>
    apiClient.get<TutorialListResponse>(`/v1/tutorials`, {
      params: { ...variables, page: pageParam },
      signal,
    });

const fetchTutorialListQEP: EndpointListQFn<TutorialListResponse, FetcTutorialListQKey> =
  apiClient =>
  ({ pageParam, signal, queryKey }) =>
    fetchTutorialListEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                        U S E   Q U E R Y
// ============================================================================
export const useTutorialListInfiniteQuery = makeUseInfiniteListQuery({
  endpointQFn: fetchTutorialListQEP,
  makeQueryKey: makeFetcTutorialListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getTutorialListQueryResult = (
  queryClient: QueryClient,
  variables: FetchTutorialListVariables,
): Effect.Effect<InfiniteData<TutorialListResponse, FetchTutorialListVariables>, FailedResponse> =>
  Effect.gen(function* () {
    const result: InfiniteData<TutorialListResponse, FetchTutorialListVariables> | undefined =
      queryClient.getQueryData(makeFetcTutorialListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchTutorialListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchTutorialListVariables,
): Effect.Effect<InfiniteData<TutorialListResponse, FetchTutorialListVariables>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise({
      catch: err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE),
      try: () =>
        queryClient.prefetchInfiniteQuery({
          initialPageParam,
          queryFn: context => runAsyncEffect(fetchTutorialListQEP(apiClient)(context)),
          queryKey: makeFetcTutorialListQKey(variables),
        }),
    });

    return yield* getTutorialListQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
