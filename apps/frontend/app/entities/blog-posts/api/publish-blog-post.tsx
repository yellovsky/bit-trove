import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { FailedResponse, GetOneBlogPostResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateBlogPostsQuery } from '../lib/invalidate-blog-posts';

export type PublishBlogPostVariables = string;

const publishBlogPost =
  (apiClient: ApiClient): MutationFunction<GetOneBlogPostResponse, PublishBlogPostVariables> =>
  (id) =>
    apiClient.patch<GetOneBlogPostResponse>(`/v1/cms-blog-posts/publish/${id}`, null, { withCredentials: true });

export const usePublishBlogPostMutation = () => {
  const apiClient = useApiClient();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useMutation<GetOneBlogPostResponse, FailedResponse, PublishBlogPostVariables>({
    mutationFn: publishBlogPost(apiClient),
    onError: (error) => {
      toast.error(tBlogPosts('Publish blog post failed'), { description: error.error.message });
    },
    onSuccess: () => {
      invalidateBlogPostsQuery(getQueryClient());
      toast.success(tBlogPosts('Publish blog post success'));
    },
  });
};
