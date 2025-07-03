import { differenceInDays } from 'date-fns';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import * as ListCardPrimitive from '@repo/ui/components/ListCard';
import { Link } from '@repo/ui/components/link';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { getShardLink } from '../lib/links';

interface ShardHorizontalCardProps {
  shard: ShortShard;
}

// TODO add time to read
export const ShardHorizontalCard: FC<ShardHorizontalCardProps> = ({ shard }) => {
  const { i18n } = useTranslation();
  const dayDiff = differenceInDays(new Date(shard.publishedAt ?? shard.createdAt), new Date());
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

  return (
    <ListCardPrimitive.Root asChild>
      <Link to={getShardLink(shard)} variant="unstyled">
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>{shard.title}</ListCardPrimitive.CardTitle>
            <ListCardPrimitive.ListCardHeaderBadge color="blue">Shard</ListCardPrimitive.ListCardHeaderBadge>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>{shard.shortDescription}</ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            {shard.author && <ListCardPrimitive.ListCardAuthor>{shard.author.name}</ListCardPrimitive.ListCardAuthor>}
            <ListCardPrimitive.ListCardDate>
              {Math.abs(dayDiff) < 7
                ? rtf.format(dayDiff, 'day')
                : dateFormatter.format(new Date(shard.publishedAt ?? shard.createdAt))}
            </ListCardPrimitive.ListCardDate>
          </ListCardPrimitive.ListCardFooter>
        </ListCardPrimitive.CardContent>

        <ListCardPrimitive.CardAside>
          {!shard.tags.length ? null : (
            <ListCardPrimitive.ListCardTagsList>
              {shard.tags.map((tag) => (
                <ListCardPrimitive.ListCardTag key={tag.id}>{tag.name}</ListCardPrimitive.ListCardTag>
              ))}
            </ListCardPrimitive.ListCardTagsList>
          )}
        </ListCardPrimitive.CardAside>
        <ListCardPrimitive.CardArrow />
      </Link>
    </ListCardPrimitive.Root>
  );
};

export const ShardHorizontalCardPending: FC = () => <Skeleton className="h-28" />;
