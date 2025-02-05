// global modules
import * as R from 'ramda';
import { Prisma } from '@prisma/client';

export type DBArticleFragment<TSelect extends Prisma.ArticleSelect> =
  Prisma.ArticleGetPayload<{ select: TSelect }>;

// ================================================================
//                 P U B L I S H I N G
// ================================================================
export const dbArticlePublishingSelect = {
  published_at: true,

  translations: {
    select: { published_at: true },
  },
} satisfies Prisma.ArticleSelect;

export interface DBArticlePublishing
  extends DBArticleFragment<typeof dbArticlePublishingSelect> {}

// ================================================================
//                 A C C E S S   C O N T R O L
// ================================================================
export const dbArticleAccessContolSelect = {
  published_at: true,

  translations: {
    select: { published_at: true },
  },
} satisfies Prisma.ArticleSelect;

export interface DBArticleAccessControl
  extends DBArticleFragment<typeof dbArticleAccessContolSelect> {}

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbArticleSegmentSelect = R.mergeDeepRight(
  R.mergeDeepRight(dbArticlePublishingSelect, dbArticleAccessContolSelect),
  {
    id: true,
    original_language_code: true,

    translations: {
      select: {
        language_code: true,
        short_description: true,
        title: true,
      },
    },
  },
) satisfies Prisma.ArticleSelect;

export interface DBArticleSegment
  extends DBArticleFragment<typeof dbArticleSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbArticleSelect = {
  ...R.mergeDeepRight(dbArticleSegmentSelect, {
    translations: {
      select: {
        seo_description: true,
        seo_keywords: true,
        seo_title: true,

        blocks: {
          select: {
            content: true,
            order: true,
            subtitle: true,
            title: true,
            type: true,
          },
        },
      },
    },
  }),
} as const satisfies Prisma.ArticleSelect;

export interface DBArticle extends DBArticleFragment<typeof dbArticleSelect> {}
