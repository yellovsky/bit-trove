// global modules
import type { FailedResponse } from '@repo/api-models';
import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { runAsyncEffect } from '~/utils/effect';
import { useApiClient } from '~/api/api-client';

export interface UseEffectMutationOptions<TResponse, TVariables> {
  endpoint: EndpointFn<TResponse, TVariables>;
  onMutate?: (queryClient: QueryClient, variables: TVariables) => unknown;

  onSuccess?: (
    queryClient: QueryClient,
    data: TResponse,
    variables: TVariables,
    context: unknown,
  ) => unknown;

  onError?: (
    queryClient: QueryClient,
    error: FailedResponse,
    variables: TVariables,
    context: unknown,
  ) => Promise<unknown> | unknown;
}

export type UseEffectMutation<TResponse, TVariables> = (
  endpointOptions: UseEffectMutationOptions<TResponse, TVariables>,
) => (
  mutationOptions: UseMutationOptions<TResponse, FailedResponse, TVariables>,
) => UseMutationResult<TResponse, FailedResponse, TVariables, unknown>;

export const useEffectMutation =
  <TResponse, TVariables>(endpointOptions: UseEffectMutationOptions<TResponse, TVariables>) =>
  (mutationOptions: UseMutationOptions<TResponse, FailedResponse, TVariables>) => {
    const apiClient = useApiClient();
    const queryClient = useQueryClient();

    return useMutation<TResponse, FailedResponse, TVariables>({
      ...mutationOptions,
      mutationFn: variables => runAsyncEffect(endpointOptions.endpoint(apiClient)({ variables })),
      onError: async (error, variables, context) => {
        await endpointOptions.onError?.(queryClient, error, variables, context);
        return mutationOptions?.onError?.(error, variables, context);
      },
      onMutate: async variables => {
        await endpointOptions.onMutate?.(queryClient, variables);
        return mutationOptions?.onMutate?.(variables);
      },
      onSuccess: async (data, variables, context) => {
        await endpointOptions.onSuccess?.(queryClient, data, variables, context);
        return mutationOptions?.onSuccess?.(data, variables, context);
      },
    });
  };
