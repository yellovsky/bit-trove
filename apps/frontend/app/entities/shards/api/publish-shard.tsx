import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import type { FailedResponse, GetOneShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateShardsQuery } from '../lib/invalidate-blog-posts';

export type PublishShardVariables = string;

const publishShard =
  (apiClient: ApiClient): MutationFunction<GetOneShardResponse, PublishShardVariables> =>
  (id) =>
    apiClient.patch<GetOneShardResponse>(`/v1/cms-shards/publish/${id}`, null, { withCredentials: true });

export const usePublishShardMutation = () => {
  const apiClient = useApiClient();
  const { t: tShards } = useTranslation('shards');

  return useMutation<GetOneShardResponse, FailedResponse, PublishShardVariables>({
    mutationFn: publishShard(apiClient),
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
