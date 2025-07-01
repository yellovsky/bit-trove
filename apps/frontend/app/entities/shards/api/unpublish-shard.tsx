import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { FailedResponse, GetOneShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateShardsQuery } from '../lib/invalidate-blog-posts';

export type UnpublishShardVariables = string;

const unpublishShard =
  (apiClient: ApiClient): MutationFunction<GetOneShardResponse, UnpublishShardVariables> =>
  (id) =>
    apiClient.patch<GetOneShardResponse>(`/v1/cms-shards/unpublish/${id}`, null, { withCredentials: true });

export const useUnpublishShardMutation = () => {
  const apiClient = useApiClient();
  const { t: tShards } = useTranslation('shards');

  return useMutation<GetOneShardResponse, FailedResponse, UnpublishShardVariables>({
    mutationFn: unpublishShard(apiClient),
    onError: (error) => {
      toast.error(tShards('Update shard failed'), { description: error.error.message });
    },
    onSuccess: () => {
      invalidateShardsQuery(getQueryClient());
      toast.success(tShards('Update shard success'));
    },
  });
};
