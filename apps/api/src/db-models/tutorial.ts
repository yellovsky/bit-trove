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

export type DBTutorialFragment<TSelect extends Prisma.TutorialSelect> =
  Prisma.TutorialGetPayload<{ select: TSelect }>;

// ================================================================
//                 P U B L I S H I N G
// ================================================================
export const dbTutorialPublishingSelect = {
  published_at: true,

  article: { select: dbArticlePublishingSelect },
} satisfies Prisma.TutorialSelect;

export interface DBTutorialPublishing
  extends DBTutorialFragment<typeof dbTutorialPublishingSelect> {}

// ================================================================
//                 A C C E S S   C O N T R O L
// ================================================================
export const dbTutorialAccessContolSelect = {
  published_at: true,

  article: { select: dbArticleAccessContolSelect },
} satisfies Prisma.TutorialSelect;

export interface DBTutorialAccessControl
  extends DBTutorialFragment<typeof dbTutorialAccessContolSelect> {}

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbTutorialSegmentSelect = R.mergeDeepRight(
  R.mergeDeepRight(dbTutorialPublishingSelect, dbTutorialAccessContolSelect),
  {
    id: true,
    slug: true,

    created_at: true,

    article: { select: dbArticleSegmentSelect },
  },
) satisfies Prisma.TutorialSelect;

export interface DBTutorialSegment
  extends DBTutorialFragment<typeof dbTutorialSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbTutorialSelect = R.mergeDeepRight(dbTutorialSegmentSelect, {
  article: { select: dbArticleSelect },
}) satisfies Prisma.TutorialSelect;

export interface DBTutorial
  extends DBTutorialFragment<typeof dbTutorialSelect> {}
