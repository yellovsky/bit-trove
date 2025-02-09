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
const FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN = 'cms_blog_post_list';

export type FetchCMSBlogPostListVariables = Omit<BlogPostListFP, 'page'>;

type FetcCMSBlogPostListQKey = TokenizedBlogPostQKey<
  typeof FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
  FetchCMSBlogPostListVariables
>;

const makeFetcCMSBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
)<FetchCMSBlogPostListVariables>;

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const fetchCMSBlogPostListEP: EndpointListFn<
  BlogPostListResponse,
  FetchCMSBlogPostListVariables
> =
  apiClient =>
  ({ variables, pageParam, signal }) =>
    apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, {
      params: { ...variables, page: pageParam },
      signal,
    });

const fetchCMSBlogPostListQEP: EndpointListQFn<BlogPostListResponse, FetcCMSBlogPostListQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    fetchCMSBlogPostListEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                         U S E   Q U E R Y
// ============================================================================
export const useCMSBlogPostListInfiniteQuery = makeUseInfiniteListQuery({
  endpointQFn: fetchCMSBlogPostListQEP,
  makeQueryKey: makeFetcCMSBlogPostListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getCMSBlogPostListQueryResult = (
  queryClient: QueryClient,
  variables: FetchCMSBlogPostListVariables,
): Effect.Effect<
  InfiniteData<BlogPostListResponse, FetchCMSBlogPostListVariables>,
  FailedResponse
> =>
  Effect.gen(function* () {
    const result: InfiniteData<BlogPostListResponse, FetchCMSBlogPostListVariables> | undefined =
      queryClient.getQueryData(makeFetcCMSBlogPostListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchCMSBlogPostListQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchCMSBlogPostListVariables,
): Effect.Effect<InfiniteData<BlogPostListResponse, FetchCMSBlogPostListVariables>, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchInfiniteQuery({
        initialPageParam,
        queryFn: context => runAsyncEffect(fetchCMSBlogPostListQEP(apiClient)(context)),
        queryKey: makeFetcCMSBlogPostListQKey(variables),
      }),
    );

    return yield* getCMSBlogPostListQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
