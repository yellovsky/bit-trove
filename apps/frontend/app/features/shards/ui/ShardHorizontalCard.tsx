import { IconPuzzle } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { differenceInDays } from 'date-fns';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import { Link } from '@repo/ui/components/link';
import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

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
      <div className={cn('flex flex-wrap rounded-default border border-border bg-gray-2', styles.card)}>
        <div className={cn('hidden bg-gray-3 text-gray-a11 sm:block', styles.image)}>
          <IconPuzzle size={100} />
        </div>

        <div className={styles.body}>
          <div className="mb-2 flex flex-wrap gap-1">
            {shard.tags.map((tag) => (
              <TagBadge key={tag.id} nonInteractive tag={tag} />
            ))}
          </div>

          <div className={cn('mb-2', styles.title)}>{shard.title}</div>
          <div className="mb-4 line-clamp-2 text-muted-foreground text-sm">{shard.shortDescription}</div>

          <div className="flex flex-wrap gap-1">
            {shard.author && (
              <>
                <div className="flex flex-wrap gap-1">
                  <div className="text-xs">by {shard.author.name}</div>
                </div>
                <div className="text-muted-foreground text-xs">•</div>
              </>
            )}
            <div className="text-muted-foreground text-xs">
              {Math.abs(dayDiff) < 7
                ? rtf.format(dayDiff, 'day')
                : dateFormatter.format(new Date(shard.publishedAt ?? shard.createdAt))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// TODO: add pending state
export const ShardHorizontalCardPending: FC = () => <div>pending</div>;
