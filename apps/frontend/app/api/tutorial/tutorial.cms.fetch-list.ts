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
const FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN = 'cms_tutorial_list';

export type FetchCMSTutorialListVariables = Omit<TutorialListFP, 'page'>;

type FetcCMSTutorialListQKey = TokenizedTutorialQKey<
  typeof FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN,
  FetchCMSTutorialListVariables
>;

const makeFetcCMSTutorialListQKey = tokenizeTutorialQKey(
  FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN,
)<FetchCMSTutorialListVariables>;

// ============================================================================
//                            E N D P O I N T
// ============================================================================
export const fetchCMSTutorialListEP: EndpointListFn<
  TutorialListResponse,
  FetchCMSTutorialListVariables
> =
  apiClient =>
  ({ variables, pageParam, signal }) =>
    apiClient.get<TutorialListResponse>(`/v1/cms/tutorials`, {
      params: { ...variables, page: pageParam },
      signal,
      withCredentials: true,
    });

const fetchCMSTutorialListQEP: EndpointListQFn<TutorialListResponse, FetcCMSTutorialListQKey> =
  apiClient =>
  ({ pageParam, signal, queryKey }) =>
    fetchCMSTutorialListEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                        U S E   Q U E R Y
// ============================================================================
export const useCMSTutorialListInfiniteQuery = makeUseInfiniteListQuery({
  endpointQFn: fetchCMSTutorialListQEP,
  makeQueryKey: makeFetcCMSTutorialListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getCMSTutorialListQueryResult = (
  queryClient: QueryClient,
  variables: FetchCMSTutorialListVariables,
): Effect.Effect<
  InfiniteData<TutorialListResponse, FetchCMSTutorialListVariables>,
  FailedResponse
> =>
  Effect.gen(function* () {
    const result: InfiniteData<TutorialListResponse, FetchCMSTutorialListVariables> | undefined =
      queryClient.getQueryData(makeFetcCMSTutorialListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchCMSTutorialListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchCMSTutorialListVariables,
): Effect.Effect<InfiniteData<TutorialListResponse, FetchCMSTutorialListVariables>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise({
      catch: err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE),
      try: () =>
        queryClient.prefetchInfiniteQuery({
          initialPageParam,
          queryFn: context => runAsyncEffect(fetchCMSTutorialListQEP(apiClient)(context)),
          queryKey: makeFetcCMSTutorialListQKey(variables),
        }),
    });

    return yield* getCMSTutorialListQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
