// global modules
import type { FailedResponse, StatusSuccessResponse } from '@repo/api-models';
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
import { invalidatePermissionPolicyQueries } from './permission-policy.invalidate';

const deletePermissionPolicyMFn =
  (apiClient: ApiClient): MutationFunction<StatusSuccessResponse, string> =>
  id =>
    runAsyncEffect(
      apiClient.delete<StatusSuccessResponse>(`/v1/cms/permission-policies/${id}`, {
        withCredentials: true,
      }),
    );

/**
 * Delete permission policy mutation hook
 *
 * @returns Delete permission policy mutation
 */
export const useDeletePermissionPolicyMutation = (
  options?: UseMutationOptions<StatusSuccessResponse, FailedResponse, string>,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: deletePermissionPolicyMFn(apiClient),
    async onSuccess(...args) {
      await invalidatePermissionPolicyQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
