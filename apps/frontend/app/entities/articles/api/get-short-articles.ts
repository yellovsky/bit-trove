import {
  type InfiniteData,
  type QueryClient,
  type QueryFunction,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import type { FailedResponse, PageRequest, ShortArticlesGetQuery, ShortArticlesGetResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const SHORT_ARTICLES_QUERY_KEY = 'short_articles';

export type ShortArticlesGetVariables = Omit<ShortArticlesGetQuery, 'page'>;

export type ShortArticlesQueryKey = readonly [
  typeof ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  typeof SHORT_ARTICLES_QUERY_KEY,
  ShortArticlesGetVariables,
];

export const createShortArticlesGetKey = (variables: ShortArticlesGetVariables): ShortArticlesQueryKey => [
  ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  SHORT_ARTICLES_QUERY_KEY,
  variables,
];

export const getShortArticlesApi = (apiClient: ApiClient, params: ShortArticlesGetQuery, signal?: AbortSignal) =>
  apiClient.get<ShortArticlesGetResponse>('/v1/articles', { params, signal });

export const getShortArticles =
  (apiClient: ApiClient): QueryFunction<ShortArticlesGetResponse, ShortArticlesQueryKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const variables: ShortArticlesGetVariables = queryKey[2];
    const params = { ...variables, page: pageParam };
    return getShortArticlesApi(apiClient, params, signal);
  };

export const prefetchShortArticles = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: ShortArticlesGetVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: getShortArticles(apiClient),
    queryKey: createShortArticlesGetKey(variables),
  });
};

export const useInfiniteShortArticlesQuery = (
  variables: ShortArticlesGetVariables,
  options?: Partial<
    UseInfiniteQueryOptions<
      ShortArticlesGetResponse,
      FailedResponse,
      InfiniteData<ShortArticlesGetResponse>,
      ShortArticlesQueryKey,
      PageRequest
    >
  >
): UseInfiniteQueryResult<InfiniteData<ShortArticlesGetResponse>, FailedResponse> => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    ShortArticlesGetResponse,
    FailedResponse,
    InfiniteData<ShortArticlesGetResponse>,
    ShortArticlesQueryKey,
    PageRequest
  >({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: getShortArticles(apiClient),
    queryKey: createShortArticlesGetKey(variables),
  });
};
