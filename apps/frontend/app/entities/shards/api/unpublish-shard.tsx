import type { UseMutationOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type UnpublishArticleVariables, useUnpublishArticleMutation } from '@entities/articles';

export type UnpublishShardVariables = UnpublishArticleVariables;

export const useUnpublishShardMutation = (
  options?: Omit<Partial<UseMutationOptions<ArticleGetResponse, FailedResponse, UnpublishShardVariables>>, 'mutationFn'>
) => {
  const { t: tShards } = useTranslation('shards');
  return useUnpublishArticleMutation({
    ...options,
    onError: (error, ...rest) => {
      toast.error(tShards('Unpublish shard failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tShards('Unpublish shard success'));
      options?.onSuccess?.(...args);
    },
  });
};
