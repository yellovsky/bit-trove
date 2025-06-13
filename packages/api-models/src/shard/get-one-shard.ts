import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { shardSchema } from './shard';

export const getOneShardQuerySchema = zod.object({
  locale: localeSchema.min(1),
});
export type GetOneShardQuery = zod.infer<typeof getOneShardQuerySchema>;

export const getOneShardResponseSchema = getSuccessResponseSchema(shardSchema);
export type GetOneShardResponse = zod.infer<typeof getOneShardResponseSchema>;
