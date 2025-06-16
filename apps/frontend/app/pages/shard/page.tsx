import { Flex, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EditorStatic } from '@widgets/editor';

import { type GetOneShardVariables, useShardQuery } from '@entities/shards';
import { TagBadge } from '@entities/tags';

export const ShardPage: FC<{ shardVariables: GetOneShardVariables }> = ({ shardVariables }) => {
  const shardResponse = useShardQuery(shardVariables);
  const shard = shardResponse.data?.data;
  const { i18n } = useTranslation();

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });

  return (
    <>
      <Title order={1}>{shard?.title}</Title>

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

      <EditorStatic content={shard?.contentJSON ?? ''} mt="lg" />
    </>
  );
};
