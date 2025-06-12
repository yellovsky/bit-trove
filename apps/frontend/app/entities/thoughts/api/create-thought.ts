import { type MutationFunction, useMutation } from '@tanstack/react-query';

import type { CreateThoughtBody, CreateThoughtResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

export type CreateThoughtVariables = CreateThoughtBody;

const createThought =
  (apiClient: ApiClient): MutationFunction<CreateThoughtResponse, CreateThoughtVariables> =>
  (variables) =>
    apiClient.post<CreateThoughtResponse>('/v1/thoughts', variables, { withCredentials: true });

export const useCreateThoughtMutation = () => {
  const apiClient = useApiClient();

  return useMutation<CreateThoughtResponse, FailedResponse, CreateThoughtVariables>({
    mutationFn: createThought(apiClient),
  });
};
