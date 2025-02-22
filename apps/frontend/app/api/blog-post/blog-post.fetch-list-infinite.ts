// global modules
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
import { getNextPageParam, initialPageParam } from '~/api/pagination';

import {
  type ApiClient,
  isFailedResponse,
  UNKNOWN_FAILED_RESPONSE,
  useApiClient,
} from '~/api/api-client';

// local modules
import { BLOG_POST_QUERY_TOKEN } from './blog-post.query-key';

const GET_BLOG_POST_LIST_INFINITE_QUERY_TOKEN = 'blog_post_infinite_list';

export type FetchBlogPostListInfiniteVariables = Omit<BlogPostListFP, 'page'>;

type GetBlogPostListInfiniteQKey = [
  typeof BLOG_POST_QUERY_TOKEN,
  typeof GET_BLOG_POST_LIST_INFINITE_QUERY_TOKEN,
  FetchBlogPostListInfiniteVariables,
];

const makeGetBlogPostListInfiniteQKey = (variables: FetchBlogPostListInfiniteVariables) =>
  [
    BLOG_POST_QUERY_TOKEN,
    GET_BLOG_POST_LIST_INFINITE_QUERY_TOKEN,
    variables,
  ] satisfies GetBlogPostListInfiniteQKey;

export const getBlogPostList = (
  apiClient: ApiClient,
  params: BlogPostListFP,
  signal?: AbortSignal,
) => apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, { params, signal });

const getBlogPostListInfiniteQFn =
  (
    apiClient: ApiClient,
  ): QueryFunction<BlogPostListResponse, GetBlogPostListInfiniteQKey, PaginationFP> =>
  ({ queryKey, pageParam, signal }) =>
    runAsyncEffect(getBlogPostList(apiClient, { ...queryKey[2], page: pageParam }, signal));

export const useBlogPostListInfiniteQuery = (
  variables: FetchBlogPostListInfiniteVariables,
  options?: UseInfiniteQueryOptions<
    BlogPostListResponse,
    FailedResponse,
    InfiniteData<BlogPostListResponse>,
    BlogPostListResponse,
    GetBlogPostListInfiniteQKey,
    PaginationFP
  >,
) => {
  const apiClient = useApiClient();

  return useInfiniteQuery({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: getBlogPostListInfiniteQFn(apiClient),
    queryKey: makeGetBlogPostListInfiniteQKey(variables),
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
      | undefined = queryClient.getQueryData(makeGetBlogPostListInfiniteQKey(variables));

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
          queryFn: getBlogPostListInfiniteQFn(apiClient),
          queryKey: makeGetBlogPostListInfiniteQKey(variables),
        }),
    });

    return yield* getBlogPostListInfiniteQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
