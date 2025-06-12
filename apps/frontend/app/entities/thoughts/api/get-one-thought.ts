import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneThoughtQuery, GetOneThoughtResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { THOUGHTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const THOUGHT_Q_KEY_TOKEN = 'thought';

export type GetOneThoughtVariables = GetOneThoughtQuery & { slugOrId: string };

type GetOneThoughtQKey = readonly [
  typeof THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  typeof THOUGHT_Q_KEY_TOKEN,
  GetOneThoughtVariables,
];

const makeGetOneThoughtQKey = (variables: GetOneThoughtVariables): GetOneThoughtQKey => [
  THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  THOUGHT_Q_KEY_TOKEN,
  variables,
];

const getOneThought =
  (apiClient: ApiClient): QueryFunction<GetOneThoughtResponse, GetOneThoughtQKey> =>
  ({ queryKey, signal }) => {
    const variables: GetOneThoughtVariables = queryKey[2];
    const { slugOrId, ...params } = variables;

    return apiClient.get<GetOneThoughtResponse>(`/v1/thoughts/${slugOrId}`, {
      params,
      signal,
    });
  };

const getThoughtQueryResult = (
  queryClient: QueryClient,
  variables: GetOneThoughtVariables
): GetOneThoughtResponse | null => {
  const result = queryClient.getQueryData<GetOneThoughtResponse>(makeGetOneThoughtQKey(variables));
  return result || null;
};

export const prefetchOneThoughtQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetOneThoughtVariables
): Promise<GetOneThoughtResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getOneThought(apiClient),
    queryKey: makeGetOneThoughtQKey(variables),
  });

  const response = getThoughtQueryResult(queryClient, variables);
  if (!response) throw new Error('Thought not found');

  return response;
};

export const useThoughtQuery = (variables: GetOneThoughtVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneThoughtResponse, FailedResponse, GetOneThoughtResponse, GetOneThoughtQKey>({
    queryFn: getOneThought(apiClient),
    queryKey: makeGetOneThoughtQKey(variables),
  });
};
