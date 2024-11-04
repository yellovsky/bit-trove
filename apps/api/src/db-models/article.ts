// global modules
import * as R from 'ramda';
import { Prisma } from '@prisma/client';

export type DBArticleFragment<TSelect extends Prisma.ArticleSelect> =
  Prisma.ArticleGetPayload<{ select: TSelect }>;

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbArticleSegmentSelect = {
  id: true,
  original_language_code: true,
  published_at: true,

  translations: {
    select: {
      language_code: true,
      published_at: true,
      title: true,

      blocks: {
        select: {
          content: true,
          order: true,
          type: true,
        },
      },
    },
  },
} satisfies Prisma.ArticleSelect;

export interface DBArticleSegment
  extends DBArticleFragment<typeof dbArticleSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbArticleSelect = R.mergeDeepRight(
  dbArticleSegmentSelect,
  {},
) satisfies Prisma.ArticleSelect;

export interface DBArticle extends DBArticleFragment<typeof dbArticleSelect> {}
