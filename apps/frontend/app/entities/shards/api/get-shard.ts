import {
  type QueryClient,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { type FailedResponse, isShardGetResponse, type ShardGetResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import {
  type ArticleGetVariables,
  type ArticleQueryKey,
  createArticleGetKey,
  getArticle,
  prefetchArticle,
} from '@entities/articles';

export type ShardGetVariables = Omit<ArticleGetVariables, 'type'>;

const createShardGetKey = (variables: ShardGetVariables): ArticleQueryKey =>
  createArticleGetKey({ ...variables, type: 'shard' });

const getShard =
  (apiClient: ApiClient): QueryFunction<ShardGetResponse, ArticleQueryKey> =>
  async (params) => {
    const response = await getArticle(apiClient)(params);
    if (!isShardGetResponse(response)) throw new Response('Not found', { status: 404 });
    return response;
  };

export const prefetchShardQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: ShardGetVariables
): Promise<ShardGetResponse> => {
  const response = await prefetchArticle(apiClient, queryClient, { ...variables, type: 'shard' });
  if (!isShardGetResponse(response)) throw new Response('Not found', { status: 404 });
  return response;
};

export const useShardQuery = (
  variables: ShardGetVariables,
  options?: Partial<UseQueryOptions<ShardGetResponse, FailedResponse, ShardGetResponse, ArticleQueryKey>>
): UseQueryResult<ShardGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<ShardGetResponse, FailedResponse, ShardGetResponse, ArticleQueryKey>({
    ...options,
    queryFn: getShard(apiClient),
    queryKey: createShardGetKey(variables),
  });
};
