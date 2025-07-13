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
  isShortShardsGetResponse,
  type PageRequest,
  type ShortShardsGetResponse,
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

export type ShortShardsGetVariables = Omit<ShortArticlesGetVariables, 'filter'> & {
  filter?: Omit<ShortArticlesGetVariables['filter'], 'typeIn'>;
};

const toShardsVariables = (variables: ShortShardsGetVariables): ShortArticlesGetVariables => ({
  ...variables,
  filter: { ...variables.filter, typeIn: ['shard' as const] },
});

const createShortShardsGetKey = (variables: ShortShardsGetVariables): ShortArticlesQueryKey =>
  createShortArticlesGetKey(toShardsVariables(variables));

const fetchShortShards =
  (apiClient: ApiClient): QueryFunction<ShortShardsGetResponse, ShortArticlesQueryKey, PageRequest> =>
  async (params) => {
    const response = await fetchShortArticles(apiClient)(params);
    if (!isShortShardsGetResponse(response)) throw new Response('Not found', { status: 404 });
    return response;
  };

export const prefetchInfiniteShortShards = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: ShortShardsGetVariables
): Promise<void> => prefetchShortArticles(apiClient, queryClient, toShardsVariables(variables));

export const useInfiniteShortShardsQuery = (
  variables: ShortShardsGetVariables,
  options?: Partial<
    UseInfiniteQueryOptions<
      ShortShardsGetResponse,
      FailedResponse,
      InfiniteData<ShortShardsGetResponse>,
      ShortArticlesQueryKey,
      PageRequest
    >
  >
): UseInfiniteQueryResult<InfiniteData<ShortShardsGetResponse>, FailedResponse> => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    ShortShardsGetResponse,
    FailedResponse,
    InfiniteData<ShortShardsGetResponse>,
    ShortArticlesQueryKey,
    PageRequest
  >({
    ...options,
    getNextPageParam,
    initialPageParam,
    queryFn: fetchShortShards(apiClient),
    queryKey: createShortShardsGetKey(variables),
  });
};
