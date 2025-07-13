import type { FC } from 'react';

import type { ShortShard } from '@repo/api-models';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { ArticleListCard } from '@features/articles';

import { getShardLink } from '../lib/links';

interface ShardHorizontalCardProps {
  shard: ShortShard;
}

export const ShardHorizontalCard: FC<ShardHorizontalCardProps> = ({ shard }) => (
  <ArticleListCard article={shard} to={getShardLink(shard)} />
);

export const ShardHorizontalCardPending: FC = () => <Skeleton className="h-28" />;
