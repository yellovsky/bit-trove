import * as zod from 'zod';

export const tagSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  slug: zod.string(),
});

export type Tag = zod.infer<typeof tagSchema>;
