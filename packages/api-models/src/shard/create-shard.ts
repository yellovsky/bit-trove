import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { shardSchema } from './shard';

export const createShardBodySchema = zod.object({
  contentJSON: jsonContentSchema,
  languageCode: localeSchema,
  published: zod.boolean(),
  seoDescription: zod.string().nullable(),
  seoKeywords: zod.string().nullable(),
  seoTitle: zod.string().nullable(),
  shardId: zod.string().nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string().min(1),
  title: zod.string().min(1),
});
export type CreateShardBody = zod.infer<typeof createShardBodySchema>;

export const createShardResponseSchema = getSuccessResponseSchema(shardSchema);
export type CreateShardResponse = zod.infer<typeof createShardResponseSchema>;
