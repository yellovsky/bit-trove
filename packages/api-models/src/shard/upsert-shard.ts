import type * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { shardSchema } from './shard';

export const shardUpsertResponseSchema = getSuccessResponseSchema(shardSchema);
export type ShardUpsertResponse = zod.infer<typeof shardUpsertResponseSchema>;
