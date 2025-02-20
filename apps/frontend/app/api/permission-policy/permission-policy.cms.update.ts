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

export interface UpsertPermissionPolicyVariables extends UpsertPermissionPolicyFP {
  id: string;
}

const updatePermissionPolicyMFn =
  (
    apiClient: ApiClient,
  ): MutationFunction<GetPermissionPolicyResponse, UpsertPermissionPolicyVariables> =>
  ({ id, ...params }) =>
    runAsyncEffect(
      apiClient.put<GetPermissionPolicyResponse>(`/v1/cms/permission-policies/${id}`, params, {
        withCredentials: true,
      }),
    );

/**
 * Delete permission policy mutation hook
 *
 * @returns Delete permission policy mutation
 */
export const useUpdatePermissionPolicyMutation = (
  options?: UseMutationOptions<
    GetPermissionPolicyResponse,
    FailedResponse,
    UpsertPermissionPolicyVariables
  >,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updatePermissionPolicyMFn(apiClient),
    async onSuccess(...args) {
      await invalidatePermissionPolicyQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
