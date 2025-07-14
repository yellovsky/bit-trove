import * as zod from 'zod';

import { isoDateSchema } from '../common/iso-date';
import { uuidSchema } from '../common/uuid';

export const articleRelationTypeSchema = zod.enum(['related', 'furtherReading']);
export type ArticleRelationType = zod.infer<typeof articleRelationTypeSchema>;

export const articleRelationSchema = zod.object({
  createdAt: isoDateSchema,
  id: uuidSchema,
  order: zod.number(),
  relationType: articleRelationTypeSchema,
  sourceId: uuidSchema,
  targetId: uuidSchema,
  updatedAt: isoDateSchema,
});

export type ArticleRelation = zod.infer<typeof articleRelationSchema>;

export const createArticleRelationSchema = zod.object({
  order: zod.number().min(0),
  relationType: articleRelationTypeSchema,
  sourceId: uuidSchema,
  targetId: uuidSchema,
});

export type CreateArticleRelation = zod.infer<typeof createArticleRelationSchema>;
