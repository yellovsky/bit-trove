import { keepPreviousData, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyThoughtsQuery, GetManyThoughtsResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { THOUGHTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_THOUGHTS_QUERY_KEY_TOKEN = 'my_thoughts';

export type GetManyThoughtsVariables = GetManyThoughtsQuery;
type GetManyThoughtsQKey = readonly [
  typeof THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_THOUGHTS_QUERY_KEY_TOKEN,
  GetManyThoughtsVariables,
];

const makeGetManyThoughtsQKey = (variables: GetManyThoughtsVariables): GetManyThoughtsQKey => [
  THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  MY_THOUGHTS_QUERY_KEY_TOKEN,
  variables,
];

const getManyThoughts =
  (apiClient: ApiClient): QueryFunction<GetManyThoughtsResponse, GetManyThoughtsQKey> =>
  async ({ queryKey, signal }) => {
    const params: GetManyThoughtsVariables = queryKey[2];
    return apiClient.get<GetManyThoughtsResponse>('/v1/my/thoughts', { params, signal, withCredentials: true });
  };

export const useMyManyThoughtsQuery = (variables: GetManyThoughtsVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetManyThoughtsResponse, FailedResponse, GetManyThoughtsResponse, GetManyThoughtsQKey>({
    placeholderData: keepPreviousData,
    queryFn: getManyThoughts(apiClient),
    queryKey: makeGetManyThoughtsQKey(variables),
  });
};
