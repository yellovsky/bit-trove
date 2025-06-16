import { Text, Timeline } from '@mantine/core';
import { differenceInDays } from 'date-fns';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';

import { Link } from '@shared/ui/link';

import { getShardLink } from '../lib/links';

interface ShardTimelineItemProps {
  shard: ShortShard;
}

export const ShardTimelineItem: FC<ShardTimelineItemProps> = ({ shard }) => {
  const { i18n } = useTranslation();
  const dayDiff = differenceInDays(new Date(shard.publishedAt ?? shard.createdAt), new Date());
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

  return (
    <Timeline.Item
      bullet
      title={
        <Link to={getShardLink(shard)} underline="never" variant="text">
          {shard.title}
        </Link>
      }
    >
      <Text c="dimmed" size="sm">
        {shard.shortDescription}
      </Text>
      <Text className="capitalize" mt={4} size="xs">
        {rtf.format(dayDiff, 'day')}
      </Text>
    </Timeline.Item>
  );
};
