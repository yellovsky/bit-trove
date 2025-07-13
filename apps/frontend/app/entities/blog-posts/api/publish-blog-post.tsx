import type { UseMutationOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type PublishArticleVariables, usePublishArticleMutation } from '@entities/articles';

export type PublishBlogPostVariables = PublishArticleVariables;

export const usePublishBlogPostMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, PublishArticleVariables>>
) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return usePublishArticleMutation({
    ...options,
    onError: (error, ...rest) => {
      toast.error(tBlogPosts('Publish blog post failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tBlogPosts('Publish blog post success'));
      options?.onSuccess?.(...args);
    },
  });
};
