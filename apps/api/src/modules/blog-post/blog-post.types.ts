// global modules
import type { BlogPostListFP } from '@repo/api-models';
import type { Prisma } from '@prisma/client';
import type { Effect, Option } from 'effect';

// common modules
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RequestContext } from 'src/types/context';

export interface GetOneBlogPostParams<TSelect extends Prisma.BlogPostSelect> {
  select: TSelect;
  slugOrID: string;
  published?: boolean;
}

export interface GetManyBlogPostParams<TSelect extends Prisma.BlogPostSelect>
  extends BlogPostListFP {
  select: TSelect;
  published?: boolean;
}

export interface BlogPostService {
  getOne<TSelect extends Prisma.BlogPostSelect>(
    reqCtx: RequestContext,
    params: GetOneBlogPostParams<TSelect>,
  ): Effect.Effect<Option.Option<DBBlogPostFragment<TSelect>>, Error>;

  getMany<TSelect extends Prisma.BlogPostSelect>(
    reqCtx: RequestContext,
    params: GetManyBlogPostParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostFragment<TSelect> | null>, Error>;
}

export const BLOG_POST_SERVICE = 'BLOG_POST_SERVICE';
