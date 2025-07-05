import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { FailedResponse, UpsertBlogPostBody, UpsertBlogPostResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateBlogPostsQuery } from '../lib/invalidate-blog-posts';

export type UpdateBlogPostVariables = UpsertBlogPostBody & { id: string };

const updateBlogPost =
  (apiClient: ApiClient): MutationFunction<UpsertBlogPostResponse, UpdateBlogPostVariables> =>
  ({ id, ...rest }) =>
    apiClient.patch<UpsertBlogPostResponse>(`/v1/blog-posts/${id}`, rest, { withCredentials: true });

export const useUpdateBlogPostMutation = () => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<UpsertBlogPostResponse, FailedResponse, UpdateBlogPostVariables>({
    mutationFn: updateBlogPost(apiClient),

    onError: (error) => {
      toast.error(tBlogPosts('Update blog post failed'), { description: error.error.message });
    },
    onSuccess: () => {
      invalidateBlogPostsQuery(getQueryClient());
      toast.success(tBlogPosts('Update blog post success'));
    },
  });
};
