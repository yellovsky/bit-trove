// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, BlogPostListResponse, FailedResponse } from '@repo/api-models';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { initialPageParam } from '~/api/pagination';
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from '~/api/api-client';
import type { EndpointListFn, EndpointListQFn } from '~/api/endpoint';
import { getQueryKeyVariables, makeUseInfiniteListQuery } from '~/api/query';

// local modules
import { tokenizeBlogPostQKey, type TokenizedBlogPostQKey } from './blog-post.query-key';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
const FETCH_BLOG_POST_LIST_QUERY_TOKEN = 'blog_post_list';

export type FetchBlogPostListVariables = Omit<BlogPostListFP, 'page'>;

type FetcBlogPostListQKey = TokenizedBlogPostQKey<
  typeof FETCH_BLOG_POST_LIST_QUERY_TOKEN,
  FetchBlogPostListVariables
>;

const makeFetcBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_BLOG_POST_LIST_QUERY_TOKEN,
)<FetchBlogPostListVariables>;

// ============================================================================
//                           E N D P O I N T
// ============================================================================
export const fetchBlogPostListEP: EndpointListFn<
  BlogPostListResponse,
  FetchBlogPostListVariables
> =
  apiClient =>
  ({ variables, pageParam, signal }) =>
    apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, {
      params: { ...variables, page: pageParam },
      signal,
    });

const fetchBlogPostListQEP: EndpointListQFn<BlogPostListResponse, FetcBlogPostListQKey> =
  apiClient =>
  ({ pageParam, signal, queryKey }) =>
    fetchBlogPostListEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                          U S E   Q U E R Y
// ============================================================================
export const useBlogPostListInfiniteQuery = makeUseInfiniteListQuery({
  endpointQFn: fetchBlogPostListQEP,
  makeQueryKey: makeFetcBlogPostListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getBlogPostListQueryResult = (
  queryClient: QueryClient,
  variables: FetchBlogPostListVariables,
): Effect.Effect<InfiniteData<BlogPostListResponse, FetchBlogPostListVariables>, FailedResponse> =>
  Effect.gen(function* () {
    const result: InfiniteData<BlogPostListResponse, FetchBlogPostListVariables> | undefined =
      queryClient.getQueryData(makeFetcBlogPostListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchBlogPostListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchBlogPostListVariables,
): Effect.Effect<InfiniteData<BlogPostListResponse, FetchBlogPostListVariables>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise({
      catch: err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE),
      try: () =>
        queryClient.prefetchInfiniteQuery({
          initialPageParam,
          queryFn: context => runAsyncEffect(fetchBlogPostListQEP(apiClient)(context)),
          queryKey: makeFetcBlogPostListQKey(variables),
        }),
    });

    return yield* getBlogPostListQueryResult(queryClient, variables);
  }).pipe(Effect.mapError(failedResponseToResponse));
