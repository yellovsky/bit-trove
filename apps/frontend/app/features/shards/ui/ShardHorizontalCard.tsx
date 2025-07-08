import { ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import * as ListCardPrimitive from '@repo/ui/components/ListCard';
import { Link } from '@repo/ui/components/link';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { getShardLink } from '../lib/links';

interface ShardHorizontalCardProps {
  shard: ShortShard;
}

export const ShardHorizontalCard: FC<ShardHorizontalCardProps> = ({ shard }) => {
  const { t } = useTranslation();
  const relativeDate = useRelativeDate(shard.publishedAt ?? shard.createdAt);

  return (
    <ListCardPrimitive.Root asChild>
      <Link to={getShardLink(shard)}>
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>{shard.title}</ListCardPrimitive.CardTitle>
            <ListCardPrimitive.ListCardHeaderBadge color="blue">Shard</ListCardPrimitive.ListCardHeaderBadge>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>{shard.shortDescription}</ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            {shard.author && <ListCardPrimitive.ListCardAuthor>{shard.author.name}</ListCardPrimitive.ListCardAuthor>}
            <ListCardPrimitive.ListCardDate>{relativeDate}</ListCardPrimitive.ListCardDate>
            <ListCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              <span>{t('{{number}} min read', { number: shard.readingTime })}</span>
            </ListCardPrimitive.CardTextWithIcon>
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
