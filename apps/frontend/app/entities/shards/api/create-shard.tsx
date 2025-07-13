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

import { type ArticleCreateVariables, createArticle, invalidateArticlesQuery } from '@entities/articles';

export type ShardCreateVariables = Omit<ArticleCreateVariables, 'type'>;

const createShard =
  (apiClient: ApiClient): MutationFunction<ShardUpsertResponse, ShardCreateVariables> =>
  async (variables) => {
    const response = await createArticle(apiClient)({ ...variables, type: 'shard' });
    if (!isShardGetResponse(response)) throw new Response('Internal server error', { status: 500 });
    return response;
  };

export const useShardCreateMutation = (
  options?: Partial<UseMutationOptions<ShardUpsertResponse, FailedResponse, ShardCreateVariables>>
): UseMutationResult<ShardUpsertResponse, FailedResponse, ShardCreateVariables> => {
  const apiClient = useApiClient();
  const { t: tShards } = useTranslation('shards');

  return useMutation<ShardUpsertResponse, FailedResponse, ShardCreateVariables>({
    ...options,
    mutationFn: createShard(apiClient),
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
