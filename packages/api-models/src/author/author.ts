import * as zod from 'zod';

export const authorSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
});

export type Author = zod.infer<typeof authorSchema>;
