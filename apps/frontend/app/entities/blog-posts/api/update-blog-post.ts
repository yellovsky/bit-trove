import {
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { type BlogPostUpsertResponse, type FailedResponse, isBlogPostGetResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateArticlesQuery, type MyArticleUpdateVariables, updateArticle } from '@entities/articles';

export type BlogPostUpdateVariables = Omit<MyArticleUpdateVariables, 'type'>;

const updateBlogPost =
  (apiClient: ApiClient): MutationFunction<BlogPostUpsertResponse, MyArticleUpdateVariables> =>
  async (params) => {
    const response = await updateArticle(apiClient)(params);
    if (!isBlogPostGetResponse(response)) throw new Response('Internal server error', { status: 500 });
    return response;
  };

export const useBlogPostUpdateMutation = (
  options?: Partial<UseMutationOptions<BlogPostUpsertResponse, FailedResponse, MyArticleUpdateVariables>>
): UseMutationResult<BlogPostUpsertResponse, FailedResponse, MyArticleUpdateVariables> => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<BlogPostUpsertResponse, FailedResponse, MyArticleUpdateVariables>({
    ...options,
    mutationFn: updateBlogPost(apiClient),
    onError: (error, ...rest) => {
      toast.error(tBlogPosts('Create blog post failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tBlogPosts('Create blog post success'));
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
