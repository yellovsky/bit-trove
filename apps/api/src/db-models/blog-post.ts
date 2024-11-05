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

export type DBBlogPostFragment<TSelect extends Prisma.BlogPostSelect> =
  Prisma.BlogPostGetPayload<{ select: TSelect }>;

// ================================================================
//                 P U B L I S H I N G
// ================================================================
export const dbBlogPostPublishingSelect = {
  published_at: true,

  article: { select: dbArticlePublishingSelect },
} satisfies Prisma.BlogPostSelect;

export interface DBBlogPostPublishing
  extends DBBlogPostFragment<typeof dbBlogPostPublishingSelect> {}

// ================================================================
//                 A C C E S S   C O N T R O L
// ================================================================
export const dbBlogPostAccessContolSelect = {
  published_at: true,

  article: { select: dbArticleAccessContolSelect },
} satisfies Prisma.BlogPostSelect;

export interface DBBlogPostAccessControl
  extends DBBlogPostFragment<typeof dbBlogPostAccessContolSelect> {}

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbBlogPostSegmentSelect = R.mergeDeepRight(
  R.mergeDeepRight(dbBlogPostPublishingSelect, dbBlogPostAccessContolSelect),
  {
    id: true,
    slug: true,

    created_at: true,

    article: { select: dbArticleSegmentSelect },
  },
) satisfies Prisma.BlogPostSelect;

export interface DBBlogPostSegment
  extends DBBlogPostFragment<typeof dbBlogPostSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbBlogPostSelect = R.mergeDeepRight(dbBlogPostSegmentSelect, {
  article: { select: dbArticleSelect },
}) satisfies Prisma.BlogPostSelect;

export interface DBBlogPost
  extends DBBlogPostFragment<typeof dbBlogPostSelect> {}
