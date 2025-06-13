import { Title } from '@mantine/core';
import type { FC } from 'react';

import { EditorStatic } from '@widgets/editor';

import { type GetOneShardVariables, useShardQuery } from '@entities/shards';

export const ShardPage: FC<{ shardVariables: GetOneShardVariables }> = ({ shardVariables }) => {
  const shardResponse = useShardQuery(shardVariables);
  const shard = shardResponse.data?.data;

  return (
    <div>
      <Title order={1}>{shard?.title}</Title>

      <EditorStatic content={shard?.contentJSON ?? ''} />
    </div>
  );
};
