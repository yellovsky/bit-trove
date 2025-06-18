import type { Prisma } from '@generated/prisma';

export const dbTagSelect = { id: true, name: true, slug: true } as const satisfies Prisma.TagSelect;
export type DBTag = Prisma.TagGetPayload<{ select: typeof dbTagSelect }>;
