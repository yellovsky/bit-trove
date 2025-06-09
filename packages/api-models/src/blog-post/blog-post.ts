// biome-ignore syntax/correctness/noTypeOnlyImportAttributes: it's a type
import type { JSONContent } from '@tiptap/core' with { 'resolution-mode': 'import' };
import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
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

const contentJSONSchema: zod.ZodType<JSONContent> = zod.any();
export type ContentJSON = zod.infer<typeof contentJSONSchema>;

export const blogPostSchema = shortBlogPostSchema.extend({
  contentJSON: contentJSONSchema.nullable(),
  seo: seoSchema,
});

export type BlogPost = zod.infer<typeof blogPostSchema>;
