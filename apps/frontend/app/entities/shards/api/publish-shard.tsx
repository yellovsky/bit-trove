import type { UseMutationOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type PublishArticleVariables, usePublishArticleMutation } from '@entities/articles';

export type PublishShardVariables = PublishArticleVariables;

export const usePublishShardMutation = (
  options?: Omit<Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, PublishShardVariables>>, 'mutationFn'>
) => {
  const { t: tShards } = useTranslation('shards');
  return usePublishArticleMutation({
    ...options,
    onError: (error, ...rest) => {
      toast.error(tShards('Publish shard failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tShards('Publish shard success'));
      options?.onSuccess?.(...args);
    },
  });
};
