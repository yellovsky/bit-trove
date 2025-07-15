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

export type MyArticleUpdateVariables = ArticleUpsertBody & { id: string };

export const myArticleUpdate =
  (apiClient: ApiClient): MutationFunction<ArticleUpsertResponse, MyArticleUpdateVariables> =>
  ({ id, ...rest }) =>
    apiClient.patch<ArticleUpsertResponse>(`/v1/my/articles/${id}`, rest, { withCredentials: true });

export const useMyArticleUpdateMutation = (
  options?: Omit<
    Partial<UseMutationOptions<ArticleUpsertResponse, FailedResponse, MyArticleUpdateVariables>>,
    'mutationFn'
  >
): UseMutationResult<ArticleUpsertResponse, FailedResponse, MyArticleUpdateVariables> => {
  const apiClient = useApiClient();

  return useMutation<ArticleUpsertResponse, FailedResponse, MyArticleUpdateVariables>({
    ...options,
    mutationFn: myArticleUpdate(apiClient),

    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
