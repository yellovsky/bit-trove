import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { CreateBlogPostBody, CreateBlogPostResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateBlogPostsQuery } from '../lib/invalidate-blog-posts';

export type CreateBlogPostVariables = CreateBlogPostBody;

const createBlogPost =
  (_apiClient: ApiClient): MutationFunction<CreateBlogPostResponse, CreateBlogPostVariables> =>
  async (variables) => {
    // TODO: Replace with actual API call when backend endpoint is implemented
    return {
      data: {
        alternatives: [],
        contentJSON: variables.contentJSON,
        id: 'temp-id',
        languageCode: variables.languageCode,
        publishedAt: variables.published ? new Date().toISOString() : null,
        seo: {
          description: variables.seoDescription,
          keywords: variables.seoKeywords,
          title: variables.seoTitle,
        },
        shortDescription: variables.shortDescription,
        slug: variables.slug,
        title: variables.title,
      },
      status: 'success',
    };
  };

export const useCreateBlogPostMutation = () => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<CreateBlogPostResponse, FailedResponse, CreateBlogPostVariables>({
    mutationFn: createBlogPost(apiClient),
    onError: (error) => {
      toast.error(tBlogPosts('Update blog post failed'));
      console.error('Create blog post error:', error);
    },
    onSuccess: () => {
      toast.success(tBlogPosts('Update blog post success'));
      invalidateBlogPostsQuery(getQueryClient());
    },
  });
};
