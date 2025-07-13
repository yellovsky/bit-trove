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

import { type ArticleCreateVariables, createArticle, invalidateArticlesQuery } from '@entities/articles';

export type BlogPostCreateVariables = Omit<ArticleCreateVariables, 'type'>;

const createBlogPost =
  (apiClient: ApiClient): MutationFunction<BlogPostUpsertResponse, BlogPostCreateVariables> =>
  async (variables) => {
    const response = await createArticle(apiClient)({ ...variables, type: 'blog_post' });
    if (!isBlogPostGetResponse(response)) throw new Response('Internal server error', { status: 500 });
    return response;
  };

export const useBlogPostCreateMutation = (
  options?: Partial<UseMutationOptions<BlogPostUpsertResponse, FailedResponse, BlogPostCreateVariables>>
): UseMutationResult<BlogPostUpsertResponse, FailedResponse, BlogPostCreateVariables> => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<BlogPostUpsertResponse, FailedResponse, BlogPostCreateVariables>({
    ...options,
    mutationFn: createBlogPost(apiClient),
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
