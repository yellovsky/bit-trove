// global modules
import type { Prisma } from '@prisma/client';
import { Effect, Option } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { RepositoryContext } from 'src/types/context';
import { PRISMA_SRV, type PrismaService } from 'src/modules/prisma';

// local modules
import type {
  BlogPostRepositoryService,
  FindUniqueBlogPostParams,
} from './blog-post-repository.types';

@Injectable()
export class BlogPostRepositoryServiceClass
  implements BlogPostRepositoryService
{
  constructor(@Inject(PRISMA_SRV) private readonly prismaSrv: PrismaService) {}

  findUnique<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindUniqueBlogPostParams<TSelect>,
  ): Effect.Effect<Option.Option<DBBlogPostFragment<TSelect>>, Error> {
    return Effect.gen(this, function* () {
      const tx = ctx.tx || this.prismaSrv;

      const result = yield* Effect.tryPromise(() =>
        tx.blogPost.findUnique({
          select: params.select,
          where: params.where,
        }),
      );

      return Option.fromNullable(result);
    });
  }
}
