// global modules
import type { CMSTutorial, CMSTutorialResponse, FailedResponse } from '@repo/api-models';

import {
  type MutationFunction,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '../../utils/effect';

// local modules
import { invalidateTutorialQueries } from './tutorial.invalidate';
import { type ApiClient, useApiClient } from '../api-client';

export interface UpdateTutorialVariables extends CMSTutorial {
  slug: string;
}

const updateTutorialMFn =
  (apiClient: ApiClient): MutationFunction<CMSTutorialResponse, UpdateTutorialVariables> =>
  ({ slug, ...data }) =>
    runAsyncEffect(
      apiClient.put<CMSTutorialResponse>(`/v1/cms/tutorials/${slug}`, data, {
        withCredentials: true,
      }),
    );

// ============================================================================
//                         U S E   M U T A T I O N
// ============================================================================
export const useUpdateTutorialMutation = (
  options?: UseMutationOptions<CMSTutorialResponse, FailedResponse, UpdateTutorialVariables>,
) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateTutorialMFn(apiClient),
    async onSuccess(...args) {
      await invalidateTutorialQueries(queryClient);
      await options?.onSuccess?.(...args);
    },
  });
};
