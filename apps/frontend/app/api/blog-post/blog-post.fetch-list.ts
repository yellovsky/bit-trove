// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, BlogPostListResponse, FailedResponse } from '@repo/api-models';
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
import { tokenizeBlogPostQKey, type TokenizedBlogPostQKey } from './blog-post.query-key';

// ==================================================================
//                   B L O G   P O S T   L I S T
// ==================================================================
const FETCH_BLOG_POST_LIST_QUERY_TOKEN = 'blog_post_list';

export const fetchBlogPostList = (
  apiClient: ApiClient,
  params: BlogPostListFP,
  signal?: AbortSignal,
): Effect.Effect<BlogPostListResponse, FailedResponse> =>
  apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, { params, signal });

type FetcBlogPostListQKey = TokenizedBlogPostQKey<
  typeof FETCH_BLOG_POST_LIST_QUERY_TOKEN,
  BlogPostListFP
>;

const makeFetcBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_BLOG_POST_LIST_QUERY_TOKEN,
)<BlogPostListFP>;

const fetchBlogPostListQFn: MakeQueryFn<BlogPostListResponse, FetcBlogPostListQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    runtime.runPromise(
      fetchBlogPostList(apiClient, { ...getQueryKeyVariables(queryKey), page: pageParam }, signal),
    );

export const useBlogPostListQuery = makeUseQuery({
  makeQueryFn: fetchBlogPostListQFn,
  makeQueryKey: makeFetcBlogPostListQKey,
});

export const useBlogPostListInfiniteQuery = makeUseInfiniteListQuery({
  makeQueryFn: fetchBlogPostListQFn,
  makeQueryKey: makeFetcBlogPostListQKey,
});

export const getBlogPostListQueryResult = (
  queryClient: QueryClient,
  variables: BlogPostListFP,
): Effect.Effect<InfiniteData<BlogPostListResponse, BlogPostListFP>, Response> =>
  Effect.gen(function* () {
    const result: InfiniteData<BlogPostListResponse, BlogPostListFP> | undefined =
      queryClient.getQueryData(makeFetcBlogPostListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(new Response('Internal server error', { status: 500 }));
  });

export const prefetchBlogPostListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: BlogPostListFP,
): Effect.Effect<InfiniteData<BlogPostListResponse, BlogPostListFP>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchInfiniteQuery({
        initialPageParam,
        queryFn: fetchBlogPostListQFn(apiClient),
        queryKey: makeFetcBlogPostListQKey(variables),
      }),
    );

    return yield* getBlogPostListQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(
      (err): Response =>
        err instanceof Response ? err : new Response('Internal server error', { status: 500 }),
    ),
  );

// ==================================================================
//              C M S    B L O G   P O S T   L I S T
// ==================================================================
const FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN = 'cms_blog_post_list';

type FetcCMSBlogPostListQKey = TokenizedBlogPostQKey<
  typeof FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
  BlogPostListFP
>;

const makeFetcCMSBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
)<BlogPostListFP>;

const fetchCMSBlogPostListQFn: MakeQueryFn<
  BlogPostListResponse,
  FetcCMSBlogPostListQKey
> = apiClient => {
  return ({ queryKey, signal }) =>
    runtime.runPromise(fetchBlogPostList(apiClient, getQueryKeyVariables(queryKey), signal));
};

export const useCMSBlogPostList = makeUseQuery({
  makeQueryFn: fetchCMSBlogPostListQFn,
  makeQueryKey: makeFetcCMSBlogPostListQKey,
});
