import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { tagSchema } from './tag';

export const getAllTagsQuerySchema = zod.object({
  filter: zod
    .object({
      like: zod.string().optional(),
    })
    .optional(),
});

export type GetAllTagsQuery = zod.infer<typeof getAllTagsQuerySchema>;

export const getAllTagsResponseSchema = getSuccessResponseSchema(tagSchema.array());
export type GetAllTagsResponse = zod.infer<typeof getAllTagsResponseSchema>;
