import { keepPreviousData, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyShardsQuery, GetManyShardsResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { SHARDS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_SHARDS_QUERY_KEY_TOKEN = 'my_shards';

export type GetManyShardsVariables = GetManyShardsQuery;
type GetManyShardsQKey = readonly [
  typeof SHARDS_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_SHARDS_QUERY_KEY_TOKEN,
  GetManyShardsVariables,
];

const makeGetManyShardsQKey = (variables: GetManyShardsVariables): GetManyShardsQKey => [
  SHARDS_ENTITY_QUERY_KEY_TOKEN,
  MY_SHARDS_QUERY_KEY_TOKEN,
  variables,
];

const getManyShards =
  (apiClient: ApiClient): QueryFunction<GetManyShardsResponse, GetManyShardsQKey> =>
  async ({ queryKey, signal }) => {
    const params: GetManyShardsVariables = queryKey[2];
    return apiClient.get<GetManyShardsResponse>('/v1/my/shards', { params, signal, withCredentials: true });
  };

export const useMyManyShardsQuery = (variables: GetManyShardsVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetManyShardsResponse, FailedResponse, GetManyShardsResponse, GetManyShardsQKey>({
    placeholderData: keepPreviousData,
    queryFn: getManyShards(apiClient),
    queryKey: makeGetManyShardsQKey(variables),
  });
};
