import { type MutationFunction, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateArticlesQuery } from '../lib/invalidate-articles';

export type PublishArticleVariables = string;

export const publishArticle =
  (apiClient: ApiClient): MutationFunction<ArticleGetResponse, PublishArticleVariables> =>
  (id) =>
    apiClient.patch<ArticleGetResponse>(`/v1/cms-articles/publish/${id}`, null, { withCredentials: true });

export const usePublishArticleMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, PublishArticleVariables>>
) => {
  const apiClient = useApiClient();

  return useMutation<ArticleGetResponse, FailedResponse, PublishArticleVariables>({
    ...options,
    mutationFn: publishArticle(apiClient),
    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
