import type { FC } from 'react';

import type { ShortShard } from '@repo/api-models';

import { ArticleGridCard, ArticleGridCardPending, ArticleListCard, ArticleListCardPending } from '@features/articles';

import { getShardLink } from '../lib/links';

interface ShardCardProps {
  shard: ShortShard;
}

export const ShardListCard: FC<ShardCardProps> = ({ shard }) => (
  <ArticleListCard article={shard} to={getShardLink(shard)} />
);

export const ShardListCardPending: FC = () => <ArticleListCardPending />;

export const ShardGridCard: FC<ShardCardProps> = ({ shard }) => (
  <ArticleGridCard article={shard} to={getShardLink(shard)} />
);

export const ShardGridCardPending: FC = () => <ArticleGridCardPending />;
