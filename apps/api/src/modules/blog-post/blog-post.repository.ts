// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RepositoryContext } from 'src/types/context';
import { PRISMA_SRV, type PrismaService } from 'src/modules/prisma';

// local modules
import type {
  BlogPostRepositoryService,
  FindManyBlogPostRepositroeyParams,
  FindUniqueBlogPostRepositroeyParams,
} from './blog-post.types';

@Injectable()
export class BlogPostRepositoryServiceClass
  implements BlogPostRepositoryService
{
  constructor(@Inject(PRISMA_SRV) private readonly prismaSrv: PrismaService) {}

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
