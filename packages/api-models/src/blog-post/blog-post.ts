import * as zod from 'zod';

import { authorSchema } from '../author/author';
import { isoDateSchema } from '../common/iso-date';
import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';
import { tagSchema } from '../tag/tag';

export const alternativeBlogPostSchema = zod.object({
  id: uuidSchema,
  languageCode: localeSchema,
  slug: zod.string(),
});
export type AlternativeBlogPost = zod.infer<typeof alternativeBlogPostSchema>;

export const shortBlogPostSchema = zod.object({
  alternatives: alternativeBlogPostSchema.array(),
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
});

export type ShortBlogPost = zod.infer<typeof shortBlogPostSchema>;

export const blogPostSchema = shortBlogPostSchema.extend({
  contentJSON: jsonContentSchema.nullable(),
  seo: seoSchema,
});

export type BlogPost = zod.infer<typeof blogPostSchema>;
