import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { thoughtSchema } from './thought';

export const createThoughtBodySchema = zod.object({
  contentJSON: jsonContentSchema,
  languageCode: localeSchema,
  published: zod.boolean(),
  seoDescription: zod.string().nullable(),
  seoKeywords: zod.string().nullable(),
  seoTitle: zod.string().nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string().min(1),
  thoughtId: zod.string().nullable(),
  title: zod.string().min(1),
});
export type CreateThoughtBody = zod.infer<typeof createThoughtBodySchema>;

export const createThoughtResponseSchema = getSuccessResponseSchema(thoughtSchema);
export type CreateThoughtResponse = zod.infer<typeof createThoughtResponseSchema>;
