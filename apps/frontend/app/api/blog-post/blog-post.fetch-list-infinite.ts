// global modules
import * as R from 'ramda';
import { Effect } from 'effect';

import type {
  BlogPostListFP,
  BlogPostListResponse,
  FailedResponse,
  PaginationFP,
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

export type FetchBlogPostListInfiniteVariables = Omit<BlogPostListFP, 'page'>;

type FetchBlogPostListInfiniteQKey = [
  QueryNamespace.BLOG_POST,
  RequestName.FETCH_LIST_INFINITE,
  FetchBlogPostListInfiniteVariables,
];

const makeFetchBlogPostListInfiniteQKey = (variables: FetchBlogPostListInfiniteVariables) =>
  [
    QueryNamespace.BLOG_POST,
    RequestName.FETCH_LIST_INFINITE,
    variables,
  ] satisfies FetchBlogPostListInfiniteQKey;

const fetchBlogPostList = (apiClient: ApiClient, params: BlogPostListFP, signal?: AbortSignal) =>
  apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, { params, signal });

export const fetchAllBlogPosts = (
  apiClient: ApiClient,
  params: FetchBlogPostListInfiniteVariables,
  signal?: AbortSignal,
) =>
  Effect.gen(function* () {
    const firstPage = yield* fetchBlogPostList(
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
              fetchBlogPostList(apiClient, { ...params, page: getPageParamByIndex(index) }, signal),
            ),
          );

    return [...firstPage.data, ...restPages.map(response => response.data).flat()].filter(
      val => !!val,
    );
  });

const fetchBlogPostListInfiniteQFn =
  (
    apiClient: ApiClient,
  ): QueryFunction<BlogPostListResponse, FetchBlogPostListInfiniteQKey, PaginationFP> =>
  ({ queryKey, pageParam, signal }) =>
    runAsyncEffect(fetchBlogPostList(apiClient, { ...queryKey[2], page: pageParam }, signal));

export const useBlogPostListInfiniteQuery = (
  variables: FetchBlogPostListInfiniteVariables,
  options?: UseInfiniteQueryOptions<
    BlogPostListResponse,
    FailedResponse,
    InfiniteData<BlogPostListResponse>,
    BlogPostListResponse,
    FetchBlogPostListInfiniteQKey,
    PaginationFP
  >,
) => {
  const apiClient = useApiClient();

  return useInfiniteQuery({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: fetchBlogPostListInfiniteQFn(apiClient),
    queryKey: makeFetchBlogPostListInfiniteQKey(variables),
  });
};

export const getBlogPostListInfiniteQueryResult = (
  queryClient: QueryClient,
  variables: FetchBlogPostListInfiniteVariables,
): Effect.Effect<
  InfiniteData<BlogPostListResponse, FetchBlogPostListInfiniteVariables>,
  FailedResponse
> =>
  Effect.gen(function* () {
    const result:
      | InfiniteData<BlogPostListResponse, FetchBlogPostListInfiniteVariables>
      | undefined = queryClient.getQueryData(makeFetchBlogPostListInfiniteQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchBlogPostListInfiniteQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchBlogPostListInfiniteVariables,
): Effect.Effect<
  InfiniteData<BlogPostListResponse, FetchBlogPostListInfiniteVariables>,
  Response
> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise({
      catch: err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE),
      try: () =>
        queryClient.prefetchInfiniteQuery({
          initialPageParam,
          queryFn: fetchBlogPostListInfiniteQFn(apiClient),
          queryKey: makeFetchBlogPostListInfiniteQKey(variables),
        }),
    });

    return yield* getBlogPostListInfiniteQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
