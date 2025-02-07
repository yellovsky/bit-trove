// global modules
import { Effect } from 'effect';
import type { FailedResponse, TutorialListFP, TutorialListResponse } from '@repo/api-models';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

// common modules
import type { ApiClient } from '~/api/api-client';
import { initialPageParam } from '~/api/pagination';
import { runtime } from '~/utils/runtime';

import {
  getQueryKeyVariables,
  type MakeQueryFn,
  makeUseInfiniteListQuery,
  makeUseQuery,
} from '~/api/query';

// local modules
import { type TokenizedTutorialQKey, tokenizeTutorialQKey } from './tutorial.query-key';

// ==================================================================
//               T U T O R I A L   L I S T
// ==================================================================
const FETCH_TUTORIAL_LIST_QUERY_TOKEN = 'tutorial_list';

export const fetchTutorialList = (
  apiClient: ApiClient,
  params: TutorialListFP,
  signal?: AbortSignal,
): Effect.Effect<TutorialListResponse, FailedResponse> =>
  apiClient.get<TutorialListResponse>(`/v1/tutorials`, { params, signal });

type FetcTutorialListQKey = TokenizedTutorialQKey<
  typeof FETCH_TUTORIAL_LIST_QUERY_TOKEN,
  TutorialListFP
>;

const makeFetcTutorialListQKey = tokenizeTutorialQKey(
  FETCH_TUTORIAL_LIST_QUERY_TOKEN,
)<TutorialListFP>;

const fetchTutorialListQFn: MakeQueryFn<TutorialListResponse, FetcTutorialListQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    runtime.runPromise(
      fetchTutorialList(apiClient, { ...getQueryKeyVariables(queryKey), page: pageParam }, signal),
    );

export const useTutorialListQuery = makeUseQuery({
  makeQueryFn: fetchTutorialListQFn,
  makeQueryKey: makeFetcTutorialListQKey,
});

export const useTutorialListInfiniteQuery = makeUseInfiniteListQuery({
  makeQueryFn: fetchTutorialListQFn,
  makeQueryKey: makeFetcTutorialListQKey,
});

export type TutorialListInfiniteQuery = ReturnType<typeof useTutorialListInfiniteQuery>;

export const getTutorialListQueryResult = (
  queryClient: QueryClient,
  variables: TutorialListFP,
): Effect.Effect<InfiniteData<TutorialListResponse, TutorialListFP>, Response> =>
  Effect.gen(function* () {
    const result: InfiniteData<TutorialListResponse, TutorialListFP> | undefined =
      queryClient.getQueryData(makeFetcTutorialListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(new Response('Internal server error', { status: 500 }));
  });

export const prefetchTutorialListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: TutorialListFP,
): Effect.Effect<InfiniteData<TutorialListResponse, TutorialListFP>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchInfiniteQuery({
        initialPageParam,
        queryFn: fetchTutorialListQFn(apiClient),
        queryKey: makeFetcTutorialListQKey(variables),
      }),
    );

    return yield* getTutorialListQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(
      (err): Response =>
        err instanceof Response ? err : new Response('Internal server error', { status: 500 }),
    ),
  );

// ==================================================================
//          C M S   T U T O R I A L   L I S T
// ==================================================================
const FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN = 'cms_tutorial_list';

type FetcCMSTutorialListQKey = TokenizedTutorialQKey<
  typeof FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN,
  TutorialListFP
>;

const makeFetcCMSTutorialListQKey = tokenizeTutorialQKey(
  FETCH_CMS_TUTORIAL_LIST_QUERY_TOKEN,
)<TutorialListFP>;

const fetchCMSTutorialListQFn: MakeQueryFn<
  TutorialListResponse,
  FetcCMSTutorialListQKey
> = apiClient => {
  return ({ queryKey, signal }) =>
    runtime.runPromise(fetchTutorialList(apiClient, getQueryKeyVariables(queryKey), signal));
};

export const useCMSTutorialList = makeUseQuery({
  makeQueryFn: fetchCMSTutorialListQFn,
  makeQueryKey: makeFetcCMSTutorialListQKey,
});
