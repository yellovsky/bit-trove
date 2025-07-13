import { type MutationFunction, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateArticlesQuery } from '../lib/invalidate-articles';

export type UnpublishArticleVariables = string;

const unpublishArticle =
  (apiClient: ApiClient): MutationFunction<ArticleGetResponse, UnpublishArticleVariables> =>
  (id) =>
    apiClient.patch<ArticleGetResponse>(`/v1/cms-articles/unpublish/${id}`, null, { withCredentials: true });

export const useUnpublishArticleMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, UnpublishArticleVariables>>
) => {
  const apiClient = useApiClient();

  return useMutation<ArticleGetResponse, FailedResponse, UnpublishArticleVariables>({
    ...options,
    mutationFn: unpublishArticle(apiClient),
    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
