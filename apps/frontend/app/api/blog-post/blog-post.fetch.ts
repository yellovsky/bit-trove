// global modules
import { Effect } from 'effect';
import type { BlogPostResponse, FailedResponse } from '@repo/api-models';

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

export interface FetchBlogPostVariables {
  slug: string;
  locale: string;
}

type FetcBlogPostQKey = [QueryNamespace.BLOG_POST, RequestName.FETCH_ONE, FetchBlogPostVariables];

const makeFetcBlogPostQKey = (variables: FetchBlogPostVariables): FetcBlogPostQKey => [
  QueryNamespace.BLOG_POST,
  RequestName.FETCH_ONE,
  variables,
];

const fetchBlogPostQFn =
  (apiClient: ApiClient): QueryFunction<BlogPostResponse, FetcBlogPostQKey> =>
  ({ queryKey, signal }) => {
    const { slug, ...params } = queryKey[2];

    return runAsyncEffect(
      apiClient.get<BlogPostResponse>(`/v1/blog-posts/${slug}`, { params, signal }),
    );
  };

export const useBlogPostQuery = (
  variables: FetchBlogPostVariables,
  options?: UseQueryOptions<BlogPostResponse, FailedResponse, BlogPostResponse, FetcBlogPostQKey>,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchBlogPostQFn(apiClient),
    queryKey: makeFetcBlogPostQKey(variables),
  });
};

export const getBlogPostQueryResult = (
  queryClient: QueryClient,
  variables: FetchBlogPostVariables,
): Effect.Effect<BlogPostResponse, FailedResponse> =>
  Effect.gen(function* () {
    const result = queryClient.getQueryData<BlogPostResponse>(makeFetcBlogPostQKey(variables));

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
        queryFn: fetchBlogPostQFn(apiClient),
        queryKey: makeFetcBlogPostQKey(variables),
      }),
    );

    return yield* getBlogPostQueryResult(queryClient, variables);
  }).pipe(
    Effect.mapError(err => (isFailedResponse(err) ? err : UNKNOWN_FAILED_RESPONSE)),
    Effect.mapError(failedResponseToResponse),
  );
