// global modules
import * as R from 'ramda';
import { Prisma } from '@prisma/client';

// common modules
import {
  dbArticleAccessContolSelect,
  dbArticlePublishingSelect,
  dbArticleSegmentSelect,
  dbArticleSelect,
} from 'src/db-models/article';

export type DBGuideFragment<TSelect extends Prisma.GuideSelect> =
  Prisma.GuideGetPayload<{ select: TSelect }>;

// ================================================================
//                 P U B L I S H I N G
// ================================================================
export const dbGuidePublishingSelect = {
  published_at: true,

  article: { select: dbArticlePublishingSelect },
} satisfies Prisma.GuideSelect;

export interface DBGuidePublishing
  extends DBGuideFragment<typeof dbGuidePublishingSelect> {}

// ================================================================
//                 A C C E S S   C O N T R O L
// ================================================================
export const dbGuideAccessContolSelect = {
  published_at: true,

  article: { select: dbArticleAccessContolSelect },
} satisfies Prisma.GuideSelect;

export interface DBGuideAccessControl
  extends DBGuideFragment<typeof dbGuideAccessContolSelect> {}

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbGuideSegmentSelect = R.mergeDeepRight(
  R.mergeDeepRight(dbGuidePublishingSelect, dbGuideAccessContolSelect),
  {
    id: true,
    slug: true,

    created_at: true,

    article: { select: dbArticleSegmentSelect },
  },
) satisfies Prisma.GuideSelect;

export interface DBGuideSegment
  extends DBGuideFragment<typeof dbGuideSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbGuideSelect = R.mergeDeepRight(dbGuideSegmentSelect, {
  article: { select: dbArticleSelect },
}) satisfies Prisma.GuideSelect;

export interface DBGuide extends DBGuideFragment<typeof dbGuideSelect> {}
