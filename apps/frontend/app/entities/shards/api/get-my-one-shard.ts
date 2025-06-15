import { type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { SHARDS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_MY_SHARD_Q_KEY_TOKEN = 'my_shard';

export type GetMyOneShardVariables = string;

type GetMyOneShardQKey = readonly [
  typeof SHARDS_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_MY_SHARD_Q_KEY_TOKEN,
  GetMyOneShardVariables,
];

const makeGetMyOneShardQKey = (variables: GetMyOneShardVariables): GetMyOneShardQKey => [
  SHARDS_ENTITY_QUERY_KEY_TOKEN,
  MY_MY_SHARD_Q_KEY_TOKEN,
  variables,
];

const getMyOneShard =
  (apiClient: ApiClient): QueryFunction<GetOneShardResponse, GetMyOneShardQKey> =>
  ({ queryKey, signal }) => {
    const id: GetMyOneShardVariables = queryKey[2];
    return apiClient.get<GetOneShardResponse>(`/v1/my/shards/${id}`, { signal, withCredentials: true });
  };

export const useMyShardQuery = (id: GetMyOneShardVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneShardResponse, FailedResponse, GetOneShardResponse, GetMyOneShardQKey>({
    queryFn: getMyOneShard(apiClient),
    queryKey: makeGetMyOneShardQKey(id),
  });
};
