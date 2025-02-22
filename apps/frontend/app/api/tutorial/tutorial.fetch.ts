// global modules
import { Effect } from 'effect';
import type { FailedResponse, GetOneTutorialFP, TutorialResponse } from '@repo/api-models';

import {
  type QueryClient,
  type QueryFunction,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { runAsyncEffect } from '~/utils/effect';

import {
  type ApiClient,
  isFailedResponse,
  UNKNOWN_FAILED_RESPONSE,
  useApiClient,
} from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

export interface FetchTutorialVariables extends GetOneTutorialFP {
  slug: string;
}

type FetcTutorialQKey = [QueryNamespace.TUTORIAL, RequestName.FETCH_ONE, FetchTutorialVariables];

const makeFetcTutorialListQKey = (variables: FetchTutorialVariables): FetcTutorialQKey => [
  QueryNamespace.TUTORIAL,
  RequestName.FETCH_ONE,
  variables,
];

const fetchTutorialQFn =
  (apiClient: ApiClient): QueryFunction<TutorialResponse, FetcTutorialQKey> =>
  ({ queryKey, signal }) => {
    const { slug, ...params } = queryKey[2];
    return runAsyncEffect(
      apiClient.get<TutorialResponse>(`/v1/tutorials/${slug}`, { params, signal }),
    );
  };

export const useTutorialQuery = (
  variables: FetchTutorialVariables,
  options?: UseQueryOptions<TutorialResponse, FailedResponse, TutorialResponse, FetcTutorialQKey>,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchTutorialQFn(apiClient),
    queryKey: makeFetcTutorialListQKey(variables),
  });
};

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
        queryFn: fetchTutorialQFn(apiClient),
        queryKey: makeFetcTutorialListQKey(variables),
      }),
    );

    return yield* getTutorialQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
