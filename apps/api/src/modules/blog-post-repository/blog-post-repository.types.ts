// global modules
import type { Prisma } from '@prisma/client';
import type { Effect, Option } from 'effect';

// common modules
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RepositoryContext } from 'src/types/context';

export interface FindUniqueBlogPostParams<
  TSelect extends Prisma.BlogPostSelect,
> {
  select: TSelect;
  where: Prisma.BlogPostWhereUniqueInput;
}

export interface FindManyBlogPostParams<TSelect extends Prisma.BlogPostSelect> {
  select: TSelect;
  where: Prisma.BlogPostWhereInput;
  skip: number;
  take: number;
  language: string;
  orderBy: { title: Prisma.SortOrder } | { created_at: Prisma.SortOrder };
}

export interface BlogPostRepositoryService {
  findUnique<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindUniqueBlogPostParams<TSelect>,
  ): Effect.Effect<Option.Option<DBBlogPostFragment<TSelect>>, Error>;

  findMany<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindManyBlogPostParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostFragment<TSelect> | null>, Error>;
}

export const BLOG_POST_REPOSITORY = 'BLOG_POST_REPOSITORY';
