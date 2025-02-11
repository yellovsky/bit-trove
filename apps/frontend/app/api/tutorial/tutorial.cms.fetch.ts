// global modules
import { Effect } from 'effect';
import type { QueryClient } from '@tanstack/react-query';
import type { CMSTutorialResponse, FailedResponse } from '@repo/api-models';

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
const FETCH_CMS_TUTORIAL_QUERY_TOKEN = 'cms_tutorial';

export interface FetchCMSTutorialVariables {
  slug: string;
  locale: string;
}

type FetchCMSTutorialQKey = TokenizedTutorialQKey<
  typeof FETCH_CMS_TUTORIAL_QUERY_TOKEN,
  FetchCMSTutorialVariables
>;

const makeFetchCMSTutorialListQKey = tokenizeTutorialQKey(
  FETCH_CMS_TUTORIAL_QUERY_TOKEN,
)<FetchCMSTutorialVariables>;

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const fetchCMSTutorialEP: EndpointFn<CMSTutorialResponse, FetchCMSTutorialVariables> =
  apiClient =>
  ({ variables, signal }) =>
    apiClient.get<CMSTutorialResponse>(`/v1/cms/tutorials/${variables.slug}`, {
      params: { locale: variables.locale },
      signal,
      withCredentials: true,
    });

const fetchCMSTutorialQEP: EndpointQFn<CMSTutorialResponse, FetchCMSTutorialQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    fetchCMSTutorialEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                         U S E   Q U E R Y
// ============================================================================
export const useCMSTutorialQuery = makeUseQuery({
  endpointQFn: fetchCMSTutorialQEP,
  makeQueryKey: makeFetchCMSTutorialListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getCMSTutorialQueryResult = (
  queryClient: QueryClient,
  variables: FetchCMSTutorialVariables,
): Effect.Effect<CMSTutorialResponse, FailedResponse> =>
  Effect.gen(function* () {
    const result = queryClient.getQueryData<CMSTutorialResponse>(
      makeFetchCMSTutorialListQKey(variables),
    );

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchCMSTutorialQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchCMSTutorialVariables,
): Effect.Effect<CMSTutorialResponse, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchQuery({
        queryFn: context => runAsyncEffect(fetchCMSTutorialQEP(apiClient)(context)),
        queryKey: makeFetchCMSTutorialListQKey(variables),
      }),
    );

    return yield* getCMSTutorialQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
