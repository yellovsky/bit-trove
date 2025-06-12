import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';

export const alternativeThoughtSchema = zod.object({
  id: uuidSchema,
  languageCode: localeSchema,
  slug: zod.string(),
});
export type AlternativeThought = zod.infer<typeof alternativeThoughtSchema>;

export const shortThoughtSchema = zod.object({
  alternatives: alternativeThoughtSchema.array(),
  createdAt: isoDateSchema,
  id: zod.string().uuid(),
  languageCode: localeSchema,
  publishedAt: isoDateSchema.nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string(),
  title: zod.string(),
});

export type ShortThought = zod.infer<typeof shortThoughtSchema>;

export const thoughtSchema = shortThoughtSchema.extend({
  contentJSON: jsonContentSchema.nullable(),
  seo: seoSchema,
});

export type Thought = zod.infer<typeof thoughtSchema>;
