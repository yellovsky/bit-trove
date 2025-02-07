// global modules
import { Effect } from 'effect';
import type { FailedResponse, GuideItemListFP, GuideItemListResponse } from '@repo/api-models';
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
import { type TokenizedGuideQKey, tokenizeGuideQKey } from './guide.query-key';

// ==================================================================
//                   G U I D E   L I S T
// ==================================================================
const FETCH_GUIDE_LIST_QUERY_TOKEN = 'guide_list';

export const fetchGuideList = (
  apiClient: ApiClient,
  params: GuideItemListFP,
  signal?: AbortSignal,
): Effect.Effect<GuideItemListResponse, FailedResponse> =>
  apiClient.get<GuideItemListResponse>(`/v1/guides`, { params, signal });

type FetcGuideListQKey = TokenizedGuideQKey<typeof FETCH_GUIDE_LIST_QUERY_TOKEN, GuideItemListFP>;

const makeFetcGuideListQKey = tokenizeGuideQKey(FETCH_GUIDE_LIST_QUERY_TOKEN)<GuideItemListFP>;

const fetchGuideListQFn: MakeQueryFn<GuideItemListResponse, FetcGuideListQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    runtime.runPromise(
      fetchGuideList(apiClient, { ...getQueryKeyVariables(queryKey), page: pageParam }, signal),
    );

export const useGuideListQuery = makeUseQuery({
  makeQueryFn: fetchGuideListQFn,
  makeQueryKey: makeFetcGuideListQKey,
});

export const useGuideListInfiniteQuery = makeUseInfiniteListQuery({
  makeQueryFn: fetchGuideListQFn,
  makeQueryKey: makeFetcGuideListQKey,
});

export type GuideListInfiniteQuery = ReturnType<typeof useGuideListInfiniteQuery>;

export const getGuideListQueryResult = (
  queryClient: QueryClient,
  variables: GuideItemListFP,
): Effect.Effect<InfiniteData<GuideItemListResponse, GuideItemListFP>, Response> =>
  Effect.gen(function* () {
    const result: InfiniteData<GuideItemListResponse, GuideItemListFP> | undefined =
      queryClient.getQueryData(makeFetcGuideListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(new Response('Internal server error', { status: 500 }));
  });

export const prefetchGuideListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GuideItemListFP,
): Effect.Effect<InfiniteData<GuideItemListResponse, GuideItemListFP>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchInfiniteQuery({
        initialPageParam,
        queryFn: fetchGuideListQFn(apiClient),
        queryKey: makeFetcGuideListQKey(variables),
      }),
    );

    return yield* getGuideListQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(
      (err): Response =>
        err instanceof Response ? err : new Response('Internal server error', { status: 500 }),
    ),
  );

// ==================================================================
//              C M S   G U I D E   L I S T
// ==================================================================
const FETCH_CMS_GUIDE_LIST_QUERY_TOKEN = 'cms_blog_post_list';

type FetcCMSGuideListQKey = TokenizedGuideQKey<
  typeof FETCH_CMS_GUIDE_LIST_QUERY_TOKEN,
  GuideItemListFP
>;

const makeFetcCMSGuideListQKey = tokenizeGuideQKey(
  FETCH_CMS_GUIDE_LIST_QUERY_TOKEN,
)<GuideItemListFP>;

const fetchCMSGuideListQFn: MakeQueryFn<
  GuideItemListResponse,
  FetcCMSGuideListQKey
> = apiClient => {
  return ({ queryKey, signal }) =>
    runtime.runPromise(fetchGuideList(apiClient, getQueryKeyVariables(queryKey), signal));
};

export const useCMSGuideList = makeUseQuery({
  makeQueryFn: fetchCMSGuideListQFn,
  makeQueryKey: makeFetcCMSGuideListQKey,
});
