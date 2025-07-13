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

export type ArticleCreateVariables = ArticleUpsertBody;

export const createArticle =
  (apiClient: ApiClient): MutationFunction<ArticleGetResponse, ArticleCreateVariables> =>
  (variables) =>
    apiClient.post<ArticleGetResponse>('/v1/cms-articles', variables, { withCredentials: true });

export const useArticleCreateMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, ArticleCreateVariables>>
): UseMutationResult<ArticleGetResponse, FailedResponse, ArticleCreateVariables> => {
  const apiClient = useApiClient();

  return useMutation<ArticleGetResponse, FailedResponse, ArticleCreateVariables>({
    ...options,
    mutationFn: createArticle(apiClient),

    onSuccess: (...args) => {
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
