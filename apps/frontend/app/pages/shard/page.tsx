import { Flex, Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { type GetOneShardVariables, useShardQuery } from '@entities/shards';
import { TagBadge } from '@entities/tags';

export const ShardPage: FC<{ shardVariables: GetOneShardVariables }> = ({ shardVariables }) => {
  const shardResponse = useShardQuery(shardVariables);
  const shard = shardResponse.data?.data;
  const { i18n } = useTranslation();

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });

  return (
    <>
      <Heading order={1}>{shard?.title}</Heading>

      <Text c="dimmed" mt="sm" size="sm">
        {dateFormatter.format(new Date(shard?.createdAt ?? ''))}
      </Text>

      {!shard?.tags.length ? null : (
        <Flex gap="xs" mt="lg">
          {shard?.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </Flex>
      )}

      {shard?.contentJSON ? <PoseDocument doc={shard.contentJSON} /> : null}
    </>
  );
};
