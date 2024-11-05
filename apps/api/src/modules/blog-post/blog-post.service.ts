// global modules
import { validate as isUUID } from 'uuid';
import type { Prisma } from '@prisma/client';
import { Effect, type Option } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { annotateLogs } from 'src/modules/runtime';
import type { DBBlogPostFragment } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RequestContext } from 'src/types/context';
import { sortToOrderBy } from 'src/utils/sort-to-order-by';

import {
  BLOG_POST_REPOSITORY,
  type BlogPostRepositoryService,
  type FindManyBlogPostParams,
} from 'src/modules/blog-post-repository';

// local modules
import type {
  BlogPostService,
  GetManyBlogPostParams,
  GetOneBlogPostParams,
} from './blog-post.types';

@Injectable()
export class BlogPostServiceClass implements BlogPostService {
  constructor(
    @Inject(BLOG_POST_REPOSITORY)
    private readonly blogPostRepositorySrv: BlogPostRepositoryService,
  ) {}

  getOne<TSelect extends Prisma.BlogPostSelect>(
    reqCtx: RequestContext,
    params: GetOneBlogPostParams<TSelect>,
  ): Effect.Effect<Option.Option<DBBlogPostFragment<TSelect>>, Error> {
    return Effect.gen(this, function* getOneBlogPost() {
      const where: Prisma.BlogPostWhereUniqueInput = isUUID(params.slugOrID)
        ? { id: params.slugOrID }
        : {
            slug: params.slugOrID,

            article: {
              published_at: { not: null },
            },
          };

      if (params.published !== undefined) {
        const published_at = params.published ? { not: null } : null;
        where.published_at = published_at;

        where.article = where.article || {};
        where.article.published_at = published_at;

        where.article.translations = where.article.translations || {};
        where.article.translations.some = { published_at };
      }

      yield* Effect.logDebug('where', where);

      return yield* this.blogPostRepositorySrv.findUnique(reqCtx, {
        select: params.select,
        where,
      });
    }).pipe(annotateLogs(BlogPostServiceClass, 'getOneBlogPost'));
  }

  getMany<TSelect extends Prisma.BlogPostSelect>(
    reqCtx: RequestContext,
    params: GetManyBlogPostParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostFragment<TSelect> | null>, Error> {
    return Effect.gen(this, function* getOneBlogPost() {
      const findParams: FindManyBlogPostParams<TSelect> = {
        language: reqCtx.language,
        orderBy: sortToOrderBy(params.sort),
        select: params.select,
        skip: params.page.offset,
        take: params.page.limit,
        where: {},
      };

      yield* Effect.logDebug('findParams', findParams);

      return yield* this.blogPostRepositorySrv.findMany(reqCtx, findParams);
    }).pipe(annotateLogs(BlogPostServiceClass, 'getMany'));
  }
}
