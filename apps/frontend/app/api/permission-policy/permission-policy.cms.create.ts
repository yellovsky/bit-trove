// global modules
import type {
  FailedResponse,
  GetPermissionPolicyResponse,
  UpsertPermissionPolicyFP,
} from '@repo/api-models';

import {
  type MutationFunction,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { invalidatePermissionPolicyQueries } from './permission-policy.query-key';

const createPermissionPolicyMFn =
  (apiClient: ApiClient): MutationFunction<GetPermissionPolicyResponse, UpsertPermissionPolicyFP> =>
  params =>
    runAsyncEffect(
      apiClient.post<GetPermissionPolicyResponse>('/v1/cms/permission-policies', params, {
        withCredentials: true,
      }),
    );

/**
 * Delete permission policy mutation hook
 *
 * @returns Delete permission policy mutation
 */
export const useCreatePermissionPolicyMutation = (
  options?: UseMutationOptions<
    GetPermissionPolicyResponse,
    FailedResponse,
    UpsertPermissionPolicyFP
  >,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createPermissionPolicyMFn(apiClient),
    async onSuccess(...args) {
      await invalidatePermissionPolicyQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
