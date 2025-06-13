import { type InfiniteData, type QueryClient, type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyShardsQuery, GetManyShardsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import { SHARDS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const SHARDS_QUERY_KEY_TOKEN = 'shards';

export type GetManyShardsVariables = Omit<GetManyShardsQuery, 'page'>;
type GetManyShardsQKey = readonly [
  typeof SHARDS_ENTITY_QUERY_KEY_TOKEN,
  typeof SHARDS_QUERY_KEY_TOKEN,
  GetManyShardsVariables,
];

const makeGetManyShardsQKey = (variables: GetManyShardsVariables): GetManyShardsQKey => [
  SHARDS_ENTITY_QUERY_KEY_TOKEN,
  SHARDS_QUERY_KEY_TOKEN,
  variables,
];

const getManyShards =
  (apiClient: ApiClient): QueryFunction<GetManyShardsResponse, GetManyShardsQKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const variables: GetManyShardsVariables = queryKey[2];
    const params = { ...variables, page: pageParam };
    return apiClient.get<GetManyShardsResponse>('/v1/shards', { params, signal });
  };

export const prefetchInfiniteShardsQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetManyShardsVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: getManyShards(apiClient),
    queryKey: makeGetManyShardsQKey(variables),
  });
};

export const useInfiniteShardsQuery = (variables: GetManyShardsVariables) => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    GetManyShardsResponse,
    FailedResponse,
    InfiniteData<GetManyShardsResponse>,
    GetManyShardsQKey,
    PageRequest
  >({
    getNextPageParam,

    initialPageParam,
    queryFn: getManyShards(apiClient),
    queryKey: makeGetManyShardsQKey(variables),
  });
};
