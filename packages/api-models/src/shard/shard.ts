import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';

export const alternativeShardSchema = zod.object({
  id: uuidSchema,
  languageCode: localeSchema,
  slug: zod.string(),
});
export type AlternativeShard = zod.infer<typeof alternativeShardSchema>;

export const shortShardSchema = zod.object({
  alternatives: alternativeShardSchema.array(),
  createdAt: isoDateSchema,
  entryId: zod.string().uuid(),
  id: zod.string().uuid(),
  languageCode: localeSchema,
  publishedAt: isoDateSchema.nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string(),
  title: zod.string(),
});

export type ShortShard = zod.infer<typeof shortShardSchema>;

export const shardSchema = shortShardSchema.extend({
  contentJSON: jsonContentSchema,
  seo: seoSchema,
});

export type Shard = zod.infer<typeof shardSchema>;
