// global modules
import * as R from 'ramda';
import { Effect } from 'effect';

import type {
  FailedResponse,
  PaginationFP,
  TutorialListFP,
  TutorialListResponse,
} from '@repo/api-models';

import {
  type InfiniteData,
  type QueryClient,
  type QueryFunction,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { runAsyncEffect } from '~/utils/effect';
import { getNextPageParam, getPageParamByIndex, initialPageParam } from '~/api/pagination';

import {
  type ApiClient,
  isFailedResponse,
  UNKNOWN_FAILED_RESPONSE,
  useApiClient,
} from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

export type FetchTutorialListVariables = Omit<TutorialListFP, 'page'>;

type FetcTutorialListQKey = [
  QueryNamespace.TUTORIAL,
  RequestName.FETCH_LIST_INFINITE,
  FetchTutorialListVariables,
];

const makeFetcTutorialListQKey = (variables: FetchTutorialListVariables): FetcTutorialListQKey => [
  QueryNamespace.TUTORIAL,
  RequestName.FETCH_LIST_INFINITE,
  variables,
];

const fetchTutorialList = (apiClient: ApiClient, params: TutorialListFP, signal?: AbortSignal) =>
  apiClient.get<TutorialListResponse>(`/v1/tutorials`, { params, signal });

export const fetchAllTutorials = (
  apiClient: ApiClient,
  params: FetchTutorialListVariables,
  signal?: AbortSignal,
) =>
  Effect.gen(function* () {
    const firstPage = yield* fetchTutorialList(
      apiClient,
      { ...params, page: initialPageParam },
      signal,
    );

    const total = firstPage.meta.pagination.total;
    const pageSize = initialPageParam.limit;
    const pagesToFetchCount = Math.ceil(total / pageSize) - 1;

    const restPages =
      pagesToFetchCount < 0
        ? []
        : yield* Effect.all(
            R.range(1, pageSize).map(index =>
              fetchTutorialList(apiClient, { ...params, page: getPageParamByIndex(index) }, signal),
            ),
          );

    return [...firstPage.data, ...restPages.map(response => response.data).flat()].filter(
      val => !!val,
    );
  });

const fetchTutorialListQFn =
  (apiClient: ApiClient): QueryFunction<TutorialListResponse, FetcTutorialListQKey, PaginationFP> =>
  ({ queryKey, pageParam, signal }) =>
    runAsyncEffect(fetchTutorialList(apiClient, { ...queryKey[2], page: pageParam }, signal));

export const useTutorialListInfiniteQuery = (
  variables: FetchTutorialListVariables,
  options?: UseInfiniteQueryOptions<
    TutorialListResponse,
    FailedResponse,
    InfiniteData<TutorialListResponse>,
    TutorialListResponse,
    FetcTutorialListQKey,
    PaginationFP
  >,
) => {
  const apiClient = useApiClient();

  return useInfiniteQuery({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: fetchTutorialListQFn(apiClient),
    queryKey: makeFetcTutorialListQKey(variables),
  });
};

export const getTutorialListInfiniteQueryResult = (
  queryClient: QueryClient,
  variables: FetchTutorialListVariables,
): Effect.Effect<InfiniteData<TutorialListResponse, FetchTutorialListVariables>, FailedResponse> =>
  Effect.gen(function* () {
    const result: InfiniteData<TutorialListResponse, FetchTutorialListVariables> | undefined =
      queryClient.getQueryData(makeFetcTutorialListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchTutorialListInfiniteQuery = (
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
          queryFn: fetchTutorialListQFn(apiClient),
          queryKey: makeFetcTutorialListQKey(variables),
        }),
    });

    return yield* getTutorialListInfiniteQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
