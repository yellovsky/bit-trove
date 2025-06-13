import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneShardQuery, GetOneShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { SHARDS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const SHARD_Q_KEY_TOKEN = 'shard';

export type GetOneShardVariables = GetOneShardQuery & { slugOrId: string };

type GetOneShardQKey = readonly [typeof SHARDS_ENTITY_QUERY_KEY_TOKEN, typeof SHARD_Q_KEY_TOKEN, GetOneShardVariables];

const makeGetOneShardQKey = (variables: GetOneShardVariables): GetOneShardQKey => [
  SHARDS_ENTITY_QUERY_KEY_TOKEN,
  SHARD_Q_KEY_TOKEN,
  variables,
];

const getOneShard =
  (apiClient: ApiClient): QueryFunction<GetOneShardResponse, GetOneShardQKey> =>
  ({ queryKey, signal }) => {
    const variables: GetOneShardVariables = queryKey[2];
    const { slugOrId, ...params } = variables;
    return apiClient.get<GetOneShardResponse>(`/v1/shards/${slugOrId}`, { params, signal });
  };

const getShardQueryResult = (queryClient: QueryClient, variables: GetOneShardVariables): GetOneShardResponse | null => {
  const result = queryClient.getQueryData<GetOneShardResponse>(makeGetOneShardQKey(variables));
  return result || null;
};

export const prefetchOneShardQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetOneShardVariables
): Promise<GetOneShardResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getOneShard(apiClient),
    queryKey: makeGetOneShardQKey(variables),
  });

  const response = getShardQueryResult(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useShardQuery = (variables: GetOneShardVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneShardResponse, FailedResponse, GetOneShardResponse, GetOneShardQKey>({
    queryFn: getOneShard(apiClient),
    queryKey: makeGetOneShardQKey(variables),
  });
};
