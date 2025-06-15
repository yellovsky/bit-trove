import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

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
      notifications.show({
        color: 'red',
        icon: <IconX />,
        message: error.error.message,
        title: tShards('Update shard failed'),
      });
    },
    onSuccess: () => {
      invalidateShardsQuery(getQueryClient());
    },
  });
};
