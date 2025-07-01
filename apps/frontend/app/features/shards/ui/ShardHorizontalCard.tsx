import { Box, Card, Group, Text } from '@mantine/core';
import { IconPuzzle } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { differenceInDays } from 'date-fns';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import { Link } from '@repo/ui/components/link';
import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';

import { TagBadge } from '@entities/tags/ui/TagBadge';

import { getShardLink } from '../lib/links';
import styles from './ShardHorizontalCard.module.css';

interface ShardHorizontalCardProps {
  shard: ShortShard;
  palette?: Palette;
}

export const ShardHorizontalCard: FC<ShardHorizontalCardProps> = ({ shard, palette }) => {
  const { i18n } = useTranslation();
  const dayDiff = differenceInDays(new Date(shard.publishedAt ?? shard.createdAt), new Date());
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

  return (
    <Link className={cx(palette && getPaletteClassName(palette))} to={getShardLink(shard)}>
      <Card className={styles.card} p={0} radius="md" withBorder>
        <Box bg="default" c="dimmed" className={styles.image} visibleFrom="xs">
          <IconPuzzle size={100} />
        </Box>

        <div className={styles.body}>
          <Group gap="xs" mb="md" wrap="nowrap">
            {shard.tags.map((tag) => (
              <TagBadge key={tag.id} nonInteractive tag={tag} />
            ))}
          </Group>

          <Text className={styles.title} mb="sm">
            {shard.title}
          </Text>

          <Text c="dimmed" lineClamp={2} mb="md" size="sm">
            {shard.shortDescription}
          </Text>
          <Group gap="xs" wrap="nowrap">
            {shard.author && (
              <>
                <Group gap="xs" wrap="nowrap">
                  <Text size="xs">by {shard.author.name}</Text>
                </Group>
                <Text c="dimmed" size="xs">
                  •
                </Text>
              </>
            )}
            <Text c="dimmed" size="xs">
              {Math.abs(dayDiff) < 7
                ? rtf.format(dayDiff, 'day')
                : dateFormatter.format(new Date(shard.publishedAt ?? shard.createdAt))}
            </Text>
          </Group>
        </div>
      </Card>
    </Link>
  );
};

// TODO: add pending state
export const ShardHorizontalCardPending: FC = () => <div>pending</div>;
