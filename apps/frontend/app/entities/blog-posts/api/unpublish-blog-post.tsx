import type { UseMutationOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type UnpublishArticleVariables, useUnpublishArticleMutation } from '@entities/articles';

export type UnpublishBlogPostVariables = UnpublishArticleVariables;

export const useUnpublishBlogPostMutation = (
  options?: Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, UnpublishArticleVariables>>
) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return useUnpublishArticleMutation({
    ...options,
    onError: (error, ...rest) => {
      toast.error(tBlogPosts('Unpublish blog post failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tBlogPosts('Unpublish blog post success'));
      options?.onSuccess?.(...args);
    },
  });
};
