// global modules
import type { FailedResponse, LoginWithEmailFP, StatusSuccessResponse } from '@repo/api-models';

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

const loginWithEmailMFn =
  (apiClient: ApiClient): MutationFunction<StatusSuccessResponse, LoginWithEmailFP> =>
  data =>
    runAsyncEffect(
      apiClient.post<StatusSuccessResponse>('/v1/auth/login', data, { withCredentials: true }),
    );

export const useLoginWithEmailMutation = (
  options?: UseMutationOptions<StatusSuccessResponse, FailedResponse, LoginWithEmailFP>,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: loginWithEmailMFn(apiClient),
    async onSuccess(...args) {
      await invalidateAuthQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
