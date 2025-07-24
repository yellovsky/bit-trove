import type { FC } from 'react';

import type { ShortShard } from '@repo/api-models';
import { Switch } from '@repo/ui/components/Switch';

import { usePublishShardMutation, useUnpublishShardMutation } from '@entities/shards';

interface ShardPublishSwitchProps {
  shard: ShortShard;
}

export const ShardPublishSwitch: FC<ShardPublishSwitchProps> = ({ shard }) => {
  const { mutate: publishShard } = usePublishShardMutation();
  const { mutate: unpublishShard } = useUnpublishShardMutation();

  return (
    <Switch
      checked={!!shard.publishedAt}
      onClick={() => {
        if (shard.publishedAt) unpublishShard(shard.id);
        else publishShard(shard.id);
      }}
    />
  );
};
