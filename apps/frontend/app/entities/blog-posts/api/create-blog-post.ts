import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { FailedResponse, GetOneBlogPostResponse, UpsertBlogPostBody } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateBlogPostsQuery } from '../lib/invalidate-blog-posts';

export type CreateBlogPostVariables = UpsertBlogPostBody;

const createBlogPost =
  (apiClient: ApiClient): MutationFunction<GetOneBlogPostResponse, CreateBlogPostVariables> =>
  (variables) =>
    apiClient.post<GetOneBlogPostResponse>('/v1/blog-posts', variables, { withCredentials: true });

export const useCreateBlogPostMutation = () => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<GetOneBlogPostResponse, FailedResponse, CreateBlogPostVariables>({
    mutationFn: createBlogPost(apiClient),
    onError: (error) => {
      toast.error(tBlogPosts('Update blog post failed'), { description: error.error.message });
    },
    onSuccess: () => {
      toast.success(tBlogPosts('Update blog post success'));
      invalidateBlogPostsQuery(getQueryClient());
    },
  });
};
