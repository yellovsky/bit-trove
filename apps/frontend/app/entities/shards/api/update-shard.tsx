import {
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { type FailedResponse, isShardGetResponse, type ShardUpsertResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type ArticleUpdateVariables, invalidateArticlesQuery, updateArticle } from '@entities/articles';

export type ShardUpdateVariables = Omit<ArticleUpdateVariables, 'type'>;

const updateShard =
  (apiClient: ApiClient): MutationFunction<ShardUpsertResponse, ArticleUpdateVariables> =>
  async (params) => {
    const response = await updateArticle(apiClient)(params);
    if (!isShardGetResponse(response)) throw new Response('Internal server error', { status: 500 });
    return response;
  };

export const useShardUpdateMutation = (
  options?: Partial<UseMutationOptions<ShardUpsertResponse, FailedResponse, ArticleUpdateVariables>>
): UseMutationResult<ShardUpsertResponse, FailedResponse, ArticleUpdateVariables> => {
  const apiClient = useApiClient();
  const { t: tShards } = useTranslation('shards');

  return useMutation<ShardUpsertResponse, FailedResponse, ArticleUpdateVariables>({
    ...options,
    mutationFn: updateShard(apiClient),
    onError: (error, ...rest) => {
      toast.error(tShards('Create shard failed'), { description: error.error.message });
      options?.onError?.(error, ...rest);
    },
    onSuccess: (...args) => {
      toast.success(tShards('Create shard success'));
      invalidateArticlesQuery(getQueryClient());
      options?.onSuccess?.(...args);
    },
  });
};
