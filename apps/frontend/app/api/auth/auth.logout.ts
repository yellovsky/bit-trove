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

// local modules
import { invalidateAuthQueries } from './auth.invalidate';
import { type ApiClient, useApiClient } from '../api-client';

const logoutWithEmailMFn =
  (apiClient: ApiClient): MutationFunction<StatusSuccessResponse, void> =>
  () =>
    runAsyncEffect(
      apiClient.post<StatusSuccessResponse>('/v1/auth/logout', {}, { withCredentials: true }),
    );

export const useLogoutMutation = (
  options?: UseMutationOptions<StatusSuccessResponse, FailedResponse, void>,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: logoutWithEmailMFn(apiClient),
    async onSuccess(...args) {
      await invalidateAuthQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
