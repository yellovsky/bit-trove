import * as zod from 'zod';

import { authorSchema } from '../author/author';
import { isoDateSchema } from '../common/iso-date';
import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';
import { tagSchema } from '../tag/tag';

export const alternativeArticleSchema = zod.object({
  id: uuidSchema,
  languageCode: localeSchema,
  slug: zod.string(),
});
export type AlternativeArticle = zod.infer<typeof alternativeArticleSchema>;

export const articleTypeSchema = zod.union([zod.literal('blog_post'), zod.literal('shard')]);
export type ArticleType = zod.infer<typeof articleTypeSchema>;

export const shortArticleSchema = zod.object({
  alternatives: alternativeArticleSchema.array(),
  author: authorSchema.nullable(),
  createdAt: isoDateSchema,
  entryId: zod.string().uuid(),
  id: zod.string().uuid(),
  languageCode: localeSchema,
  publishedAt: isoDateSchema.nullable(),
  readingTime: zod.number().int().min(1).max(999),
  shortDescription: zod.string().nullable(),
  slug: zod.string(),
  tags: tagSchema.array(),
  title: zod.string(),
  type: articleTypeSchema,
});
export type ShortArticle = zod.infer<typeof shortArticleSchema>;

export const articleSchema = shortArticleSchema.extend({
  contentJSON: jsonContentSchema.nullable(),
  seo: seoSchema,
});

export type Article = zod.infer<typeof articleSchema>;
