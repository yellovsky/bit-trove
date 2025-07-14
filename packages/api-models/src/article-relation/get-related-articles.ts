import * as zod from 'zod';

import { shortArticleSchema } from '../article/article';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { uuidSchema } from '../common/uuid';
import { articleRelationTypeSchema } from './article-relation';

export const articleRelationDirectionSchema = zod.enum(['source', 'target']);
export type ArticleRelationDirection = zod.infer<typeof articleRelationDirectionSchema>;

export const articleWithRelationSchema = zod.object({
  article: shortArticleSchema,
  direction: articleRelationDirectionSchema,
  id: uuidSchema,
  order: zod.number(),
  relationType: articleRelationTypeSchema,
});
export type ArticleWithRelation = zod.infer<typeof articleWithRelationSchema>;

const relatedArticlesGetQueryFilterSchema = zod.object({
  related_to: uuidSchema.optional(),
});
export type RelatedArticlesGetQueryFilter = zod.infer<typeof relatedArticlesGetQueryFilterSchema>;

export const relatedArticlesGetQuerySchema = zod.object({
  filter: relatedArticlesGetQueryFilterSchema.optional(),
  locale: localeSchema,
});
export type RelatedArticlesGetQuery = zod.infer<typeof relatedArticlesGetQuerySchema>;

export const relatedArticleResponseSchema = getSuccessResponseSchema(articleWithRelationSchema.array());

export type RelatedArticleResponse = zod.infer<typeof relatedArticleResponseSchema>;
