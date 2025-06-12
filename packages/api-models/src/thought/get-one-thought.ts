import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { thoughtSchema } from './thought';

export const getOneThoughtQuerySchema = zod.object({
  locale: localeSchema.min(1),
});
export type GetOneThoughtQuery = zod.infer<typeof getOneThoughtQuerySchema>;

export const getOneThoughtResponseSchema = getSuccessResponseSchema(thoughtSchema);
export type GetOneThoughtResponse = zod.infer<typeof getOneThoughtResponseSchema>;
