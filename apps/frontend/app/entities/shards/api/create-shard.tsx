import { type MutationFunction, useMutation } from '@tanstack/react-query';

import type { FailedResponse, UpsertShardBody, UpsertShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

export type CreateShardVariables = UpsertShardBody;

const createShard =
  (apiClient: ApiClient): MutationFunction<UpsertShardResponse, CreateShardVariables> =>
  (variables) =>
    apiClient.post<UpsertShardResponse>('/v1/shards', variables, { withCredentials: true });

export const useCreateShardMutation = () => {
  const apiClient = useApiClient();

  return useMutation<UpsertShardResponse, FailedResponse, CreateShardVariables>({
    mutationFn: createShard(apiClient),
  });
};
