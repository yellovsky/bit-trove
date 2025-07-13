import {
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import type { ArticleUpsertBody, ArticleUpsertResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateArticlesQuery } from '../lib/invalidate-articles';

export type ArticleUpdateVariables = ArticleUpsertBody & { id: string };

export const updateArticle =
  (apiClient: ApiClient): MutationFunction<ArticleUpsertResponse, ArticleUpdateVariables> =>
  ({ id, ...rest }) =>
    apiClient.patch<ArticleUpsertResponse>(`/v1/cms-articles/${id}`, rest, { withCredentials: true });

export const useArticleUpdateMutation = (
  options?: Omit<
    Partial<UseMutationOptions<ArticleUpsertResponse, FailedResponse, ArticleUpdateVariables>>,
    'mutationFn'
  >
): UseMutationResult<ArticleUpsertResponse, FailedResponse, ArticleUpdateVariables> => {
  const apiClient = useApiClient();

  return useMutation<ArticleUpsertResponse, FailedResponse, ArticleUpdateVariables>({
    ...options,
    mutationFn: updateArticle(apiClient),

    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
