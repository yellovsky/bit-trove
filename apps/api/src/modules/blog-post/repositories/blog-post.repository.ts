// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { PrismaService } from 'src/modules/prisma';
import type { RepositoryContext } from 'src/types/context';

// local modules
import type { DBBlogPostFragment } from './blog-post.db-models';

export interface FindUniqueBlogPostRepositroeyParams<
  TSelect extends Prisma.BlogPostSelect,
> {
  select: TSelect;
  where: Prisma.BlogPostWhereUniqueInput;
}

export interface FindManyBlogPostRepositroeyParams<
  TSelect extends Prisma.BlogPostSelect,
> {
  select: TSelect;
  where: Prisma.BlogPostWhereInput;
  skip: number;
  take: number;
  language: string;
  orderBy: { title: Prisma.SortOrder } | { created_at: Prisma.SortOrder };
}

@Injectable()
export class BlogPostRepositoryService {
  constructor(
    @Inject()
    private readonly prismaSrv: PrismaService,
  ) {}

  findUnique<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindUniqueBlogPostRepositroeyParams<TSelect>,
  ): Effect.Effect<DBBlogPostFragment<TSelect> | null, Error> {
    const tx = ctx.tx || this.prismaSrv;

    return Effect.tryPromise(() =>
      tx.blogPost.findUnique({ select: params.select, where: params.where }),
    );
  }

  findMany<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    { orderBy, ...rest }: FindManyBlogPostRepositroeyParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostFragment<TSelect> | null>, Error> {
    const tx = ctx.tx || this.prismaSrv;

    if ('title' in orderBy) {
      return Effect.gen(this, function* () {
        const where = { article: { blog_post: rest.where } };
        const select = {
          article: { select: { blog_post: { select: rest.select } } },
        };

        const { items, total } = yield* Effect.all({
          items: Effect.tryPromise(() =>
            tx.articleTranslation.findMany({
              orderBy: orderBy,
              select,
              skip: rest.skip,
              take: rest.take,
              where,
            }),
          ),
          total: Effect.tryPromise(() =>
            tx.articleTranslation.count({ where }),
          ),
        });

        return { items: items.map((item) => item.article.blog_post), total };
      });
    } else {
      return Effect.all({
        items: Effect.tryPromise(() =>
          tx.blogPost.findMany({
            orderBy: orderBy,
            select: rest.select,
            skip: rest.skip,
            take: rest.take,
            where: rest.where,
          }),
        ),
        total: Effect.tryPromise(() =>
          tx.blogPost.count({ where: rest.where }),
        ),
      });
    }
  }
}
