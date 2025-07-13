import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { articleSchema, articleTypeSchema } from './article';

export const articleGetQuerySchema = zod.object({
  locale: localeSchema,
  type: articleTypeSchema,
});
export type ArticleGetQuery = zod.infer<typeof articleGetQuerySchema>;

export const articleGetResponseSchema = getSuccessResponseSchema(articleSchema);
export type ArticleGetResponse = zod.infer<typeof articleGetResponseSchema>;
