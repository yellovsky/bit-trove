import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { seoSchema } from '../common/seo';
import { uuidSchema } from '../common/uuid';

export const alternativeBlogPostSchema = zod.object({
  id: uuidSchema,
  languageCode: localeSchema,
  slug: zod.string(),
});
export type AlternativeBlogPost = zod.infer<typeof alternativeBlogPostSchema>;

export const shortBlogPostSchema = zod.object({
  alternatives: alternativeBlogPostSchema.array(),
  id: zod.string().uuid(),
  languageCode: localeSchema,
  publishedAt: isoDateSchema.nullable(),
  shortDescription: zod.string(),
  slug: zod.string(),
  title: zod.string(),
});

export type ShortBlogPost = zod.infer<typeof shortBlogPostSchema>;

export const blogPostSchema = shortBlogPostSchema.extend({
  contentJSON: jsonContentSchema.nullable(),
  seo: seoSchema,
});

export type BlogPost = zod.infer<typeof blogPostSchema>;
