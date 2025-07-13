import * as zod from 'zod';

import { articleSchema, type ShortArticle, shortArticleSchema } from '../article';

export const shortShardSchema = shortArticleSchema.omit({ type: true }).extend({ type: zod.literal('shard') });
export type ShortShard = zod.infer<typeof shortShardSchema>;
export const isShortShard = (maybeShard: ShortArticle): maybeShard is ShortShard => maybeShard.type === 'shard';

export const shardSchema = articleSchema.omit({ type: true }).extend({ type: zod.literal('shard') });
export type Shard = zod.infer<typeof shardSchema>;
export const isShard = (maybeShard: ShortArticle): maybeShard is ShortShard => maybeShard.type === 'shard';
