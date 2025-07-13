import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { articleSchema, articleTypeSchema } from './article';

export const articleUpsertBodySchema = zod.object({
  contentJSON: jsonContentSchema,
  entryId: zod.string().nullable(),
  languageCode: localeSchema,
  published: zod.boolean(),
  seoDescription: zod.string().nullable(),
  seoKeywords: zod.string().nullable(),
  seoTitle: zod.string().nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string().min(1),
  tags: zod.string().array(),
  title: zod.string().min(1),
  type: articleTypeSchema,
});
export type ArticleUpsertBody = zod.infer<typeof articleUpsertBodySchema>;

export const articleUpsertResponseSchema = getSuccessResponseSchema(articleSchema);
export type ArticleUpsertResponse = zod.infer<typeof articleUpsertResponseSchema>;
