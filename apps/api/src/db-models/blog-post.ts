// global modules
import * as R from 'ramda';
import { Prisma } from '@prisma/client';

// common modules
import { dbArticleSegmentSelect } from 'src/db-models/article';

export type DBBlogPostFragment<TSelect extends Prisma.BlogPostSelect> =
  Prisma.BlogPostGetPayload<{ select: TSelect }>;

// ================================================================
//                     S E G M E N T
// ================================================================
export const dbBlogPostSegmentSelect = {
  id: true,
  slug: true,

  created_at: true,
  published_at: true,

  article: { select: dbArticleSegmentSelect },
} satisfies Prisma.BlogPostSelect;

export interface DBBlogPostSegment
  extends DBBlogPostFragment<typeof dbBlogPostSegmentSelect> {}

// ================================================================
//                      E N T I T Y
// ================================================================
export const dbBlogPostSelect = R.mergeDeepRight(
  dbBlogPostSegmentSelect,
  {},
) satisfies Prisma.BlogPostSelect;

export interface DBBlogPost
  extends DBBlogPostFragment<typeof dbBlogPostSelect> {}
