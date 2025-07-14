import type { Prisma } from '@generated/prisma';

import { dbShortArticleSelect } from './articles.repository.types';

export const dbArticleRelationSelect = {
  source: { select: dbShortArticleSelect },
  target: { select: dbShortArticleSelect },
} as const satisfies Prisma.ArticleRelationSelect;

export type DBArticleRelation = Prisma.ArticleRelationGetPayload<{
  select: typeof dbArticleRelationSelect;
}>;
