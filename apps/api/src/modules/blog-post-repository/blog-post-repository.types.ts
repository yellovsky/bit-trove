// global modules
import type { Prisma } from '@prisma/client';
import type { Effect, Option } from 'effect';

// common modules
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { RepositoryContext } from 'src/types/context';

export interface FindUniqueBlogPostParams<
  TSelect extends Prisma.BlogPostSelect,
> {
  select: TSelect;
  where: Prisma.BlogPostWhereUniqueInput;
}

export interface BlogPostRepositoryService {
  findUnique<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindUniqueBlogPostParams<TSelect>,
  ): Effect.Effect<Option.Option<DBBlogPostFragment<TSelect>>, Error>;
}

export const BLOG_POST_REPOSITORY = 'BLOG_POST_REPOSITORY';
