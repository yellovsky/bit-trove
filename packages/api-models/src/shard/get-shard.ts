import type * as zod from 'zod';

import { type ArticleGetResponse, articleGetQuerySchema } from '../article';
import { getSuccessResponseSchema } from '../common/success-response';
import { isShard, shardSchema } from './shard';

export const shardGetQuerySchema = articleGetQuerySchema;
export type ShardGetQuery = zod.infer<typeof shardGetQuerySchema>;

export const shardGetResponseSchema = getSuccessResponseSchema(shardSchema);
export type ShardGetResponse = zod.infer<typeof shardGetResponseSchema>;

export const isShardGetResponse = (maybeResponse: ArticleGetResponse): maybeResponse is ShardGetResponse =>
  isShard(maybeResponse.data);
