import { type MutationFunction, useMutation } from '@tanstack/react-query';

import type { CreateShardBody, CreateShardResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

export type CreateShardVariables = CreateShardBody;

const createShard =
  (apiClient: ApiClient): MutationFunction<CreateShardResponse, CreateShardVariables> =>
  (variables) =>
    apiClient.post<CreateShardResponse>('/v1/shards', variables, { withCredentials: true });

export const useCreateShardMutation = () => {
  const apiClient = useApiClient();

  return useMutation<CreateShardResponse, FailedResponse, CreateShardVariables>({
    mutationFn: createShard(apiClient),
  });
};
