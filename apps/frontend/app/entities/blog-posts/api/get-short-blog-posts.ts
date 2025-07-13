import {
  type InfiniteData,
  type QueryClient,
  type QueryFunction,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {
  type FailedResponse,
  isShortBlogPostsGetResponse,
  type PageRequest,
  type ShortBlogPostsGetResponse,
} from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import {
  createShortArticlesGetKey,
  prefetchShortArticles,
  type ShortArticlesGetVariables,
  type ShortArticlesQueryKey,
} from '@entities/articles';
import { fetchShortArticles } from '@entities/articles/api/get-short-articles';

export type ShortBlogPostsGetVariables = Omit<ShortArticlesGetVariables, 'filter'> & {
  filter?: Omit<ShortArticlesGetVariables['filter'], 'typeIn'>;
};

const toBlogPostsVariables = (variables: ShortBlogPostsGetVariables): ShortArticlesGetVariables => ({
  ...variables,
  filter: { ...variables.filter, typeIn: ['blog_post' as const] },
});

const createShortBlogPostsGetKey = (variables: ShortBlogPostsGetVariables): ShortArticlesQueryKey =>
  createShortArticlesGetKey(toBlogPostsVariables(variables));

const fetchShortBlogPosts =
  (apiClient: ApiClient): QueryFunction<ShortBlogPostsGetResponse, ShortArticlesQueryKey, PageRequest> =>
  async (params) => {
    const response = await fetchShortArticles(apiClient)(params);
    if (!isShortBlogPostsGetResponse(response)) throw new Response('Internal server error', { status: 500 });
    return response;
  };

export const prefetchInfiniteShortBlogPosts = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: ShortBlogPostsGetVariables
): Promise<void> => prefetchShortArticles(apiClient, queryClient, toBlogPostsVariables(variables));

export const useInfiniteShortBlogPostsQuery = (
  variables: ShortBlogPostsGetVariables,
  options?: Partial<
    UseInfiniteQueryOptions<
      ShortBlogPostsGetResponse,
      FailedResponse,
      InfiniteData<ShortBlogPostsGetResponse>,
      ShortArticlesQueryKey,
      PageRequest
    >
  >
): UseInfiniteQueryResult<InfiniteData<ShortBlogPostsGetResponse>, FailedResponse> => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    ShortBlogPostsGetResponse,
    FailedResponse,
    InfiniteData<ShortBlogPostsGetResponse>,
    ShortArticlesQueryKey,
    PageRequest
  >({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: fetchShortBlogPosts(apiClient),
    queryKey: createShortBlogPostsGetKey(variables),
  });
};
