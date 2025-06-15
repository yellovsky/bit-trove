import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import type { FailedResponse, UpsertShardBody, UpsertShardResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { invalidateShardsQuery } from '../lib/invalidate-blog-posts';

export type UpdateShardVariables = UpsertShardBody & { id: string };

const updateShard =
  (apiClient: ApiClient): MutationFunction<UpsertShardResponse, UpdateShardVariables> =>
  ({ id, ...rest }) =>
    apiClient.patch<UpsertShardResponse>(`/v1/shards/${id}`, rest, { withCredentials: true });

export const useUpdateShardMutation = () => {
  const apiClient = useApiClient();
  const { t: tShards } = useTranslation('shards');

  return useMutation<UpsertShardResponse, FailedResponse, UpdateShardVariables>({
    mutationFn: updateShard(apiClient),

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
      notifications.show({
        color: 'green',
        icon: <IconX />,
        message: tShards('Update shard success'),
      });
    },
  });
};
