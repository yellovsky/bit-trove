import type { ShortShard } from '@repo/api-models';

export const getCreateShardLink = (): string => '/cms/shards/create';
export const getShardLink = (shard: Pick<ShortShard, 'slug' | 'type'>): string => `/shards/${shard.slug}`;
export const getEditShardLink = (shard: Pick<ShortShard, 'id'>): string => `/cms/shards/${shard.id}/edit`;
export const getShardsLink = (): string => '/shards';
export const getCmsShardsLink = (): string => '/cms/shards';
