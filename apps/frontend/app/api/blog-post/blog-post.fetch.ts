// global modules
import { Effect } from 'effect';
import type { QueryClient } from '@tanstack/react-query';
import type { BlogPostResponse, FailedResponse } from '@repo/api-models';

// common modules
import { failedResponseToResponse } from '~/utils/response';
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from '~/api/api-client';
import type { EndpointFn, EndpointQFn } from '~/api/endpoint';
import { getQueryKeyVariables, makeUseQuery } from '~/api/query';

// local modules
import { tokenizeBlogPostQKey, type TokenizedBlogPostQKey } from './blog-post.query-key';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
const FETCH_BLOG_POST_QUERY_TOKEN = 'blog_post';

export interface FetchBlogPostVariables {
  slug: string;
  locale: string;
}

type FetcBlogPostQKey = TokenizedBlogPostQKey<
  typeof FETCH_BLOG_POST_QUERY_TOKEN,
  FetchBlogPostVariables
>;

const makeFetcBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_BLOG_POST_QUERY_TOKEN,
)<FetchBlogPostVariables>;

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const fetchBlogPostEP: EndpointFn<BlogPostResponse, FetchBlogPostVariables> =
  apiClient =>
  ({ variables, signal }) =>
    apiClient.get<BlogPostResponse>(`/v1/blog-posts/${variables.slug}`, {
      params: { locale: variables.locale },
      signal,
    });

const fetchBlogPostQEP: EndpointQFn<BlogPostResponse, FetcBlogPostQKey> =
  apiClient =>
  ({ queryKey, pageParam, signal }) =>
    fetchBlogPostEP(apiClient)({
      pageParam,
      signal,
      variables: getQueryKeyVariables(queryKey),
    });

// ============================================================================
//                         U S E   Q U E R Y
// ============================================================================
export const useBlogPostQuery = makeUseQuery({
  endpointQFn: fetchBlogPostQEP,
  makeQueryKey: makeFetcBlogPostListQKey,
});

// ============================================================================
//                        P R E F E T C H
// ============================================================================
export const getBlogPostQueryResult = (
  queryClient: QueryClient,
  variables: FetchBlogPostVariables,
): Effect.Effect<BlogPostResponse, FailedResponse> =>
  Effect.gen(function* () {
    const result = queryClient.getQueryData<BlogPostResponse>(makeFetcBlogPostListQKey(variables));

    if (result) return result;
    else return yield* Effect.fail(UNKNOWN_FAILED_RESPONSE);
  });

export const prefetchBlogPostQuery = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: FetchBlogPostVariables,
): Effect.Effect<BlogPostResponse, Response> =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      queryClient.prefetchQuery({
        queryFn: context => runAsyncEffect(fetchBlogPostQEP(apiClient)(context)),
        queryKey: makeFetcBlogPostListQKey(variables),
      }),
    );

    return yield* getBlogPostQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
