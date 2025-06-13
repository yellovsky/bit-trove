import type { ShortShard } from '@repo/api-models';

export const getCreateShardLink = (): string => '/cms/shards/create';
export const getShardLink = (shard: Pick<ShortShard, 'slug'>): string => `/shards/${shard.slug}`;
