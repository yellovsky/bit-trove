import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { FailedResponse, GetOneBlogPostResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateBlogPostsQuery } from '../lib/invalidate-blog-posts';

export type UnpublishBlogPostVariables = string;

const unpublishBlogPost =
  (apiClient: ApiClient): MutationFunction<GetOneBlogPostResponse, UnpublishBlogPostVariables> =>
  (id) =>
    apiClient.patch<GetOneBlogPostResponse>(`/v1/cms-blog-posts/unpublish/${id}`, null, { withCredentials: true });

export const useUnpublishBlogPostMutation = () => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<GetOneBlogPostResponse, FailedResponse, UnpublishBlogPostVariables>({
    mutationFn: unpublishBlogPost(apiClient),
    onError: (error) => {
      toast.error(tBlogPosts('Unpublish blog post failed'), { description: error.error.message });
    },
    onSuccess: () => {
      invalidateBlogPostsQuery(getQueryClient());
      toast.success(tBlogPosts('Unpublish blog post success'));
    },
  });
};
