import {
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import type { ArticleGetResponse, ArticleUpsertBody, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateArticlesQuery } from '../lib/invalidate-articles';

export type MyArticleCreateVariables = ArticleUpsertBody;

export const createMyArticle =
  (apiClient: ApiClient): MutationFunction<ArticleGetResponse, MyArticleCreateVariables> =>
  (variables) =>
    apiClient.post<ArticleGetResponse>('/v1/my/articles', variables, { withCredentials: true });

export const useMyArticleCreateMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, MyArticleCreateVariables>>
): UseMutationResult<ArticleGetResponse, FailedResponse, MyArticleCreateVariables> => {
  const apiClient = useApiClient();

  return useMutation<ArticleGetResponse, FailedResponse, MyArticleCreateVariables>({
    ...options,
    mutationFn: createMyArticle(apiClient),

    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
