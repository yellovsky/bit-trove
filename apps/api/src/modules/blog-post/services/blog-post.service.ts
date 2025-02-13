// global modules
import type { BlogPostListFP } from '@repo/api-models';
import type { Prisma } from '@prisma/client';
import { Effect, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { annotateLogs } from 'src/modules/runtime';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { PublishingFilter } from 'src/types/publishing-filter';
import type { RequestContext } from 'src/types/context';
import { sortToOrderBy } from 'src/utils/sort-to-order-by';
import { type ApiError, NotFoundAPIError, toApiError } from 'src/exceptions';

import {
  addArticlePublishingFilter,
  addPublishingFilter,
  addSlugOrIDFilter,
} from 'src/utils/where';

// local modules
import { BlogPostAccessControlService } from './blog-post-access-control.service';
import { BlogPostPublishingrService } from './blog-post-publishing.service';

import {
  type DBBlogPost,
  type DBBlogPostSegment,
  dbBlogPostSegmentSelect,
  dbBlogPostSelect,
} from '../repositories/blog-post.db-models';

import {
  BlogPostRepositoryService,
  type FindManyBlogPostRepositroeyParams,
} from '../repositories/blog-post.repository';

export interface GetOneBlogPostParams {
  slugOrID: string;
  publishingFilter: PublishingFilter;
}

export interface GetManyBlogPostParams extends BlogPostListFP {
  publishingFilter: PublishingFilter;
}

@Injectable()
export class BlogPostService {
  constructor(
    @Inject()
    private readonly blogPostRepositorySrv: BlogPostRepositoryService,

    @Inject()
    private readonly blogPostPublishingSrv: BlogPostPublishingrService,

    @Inject()
    private readonly blogPostAccessControlSrv: BlogPostAccessControlService,
  ) {}

  getOne(
    reqCtx: RequestContext,
    params: GetOneBlogPostParams,
  ): Effect.Effect<DBBlogPost, ApiError> {
    return Effect.gen(this, function* getOneBlogPost() {
      const where: Prisma.BlogPostWhereUniqueInput = pipe(
        {} as Partial<Prisma.BlogPostWhereUniqueInput>,
        addSlugOrIDFilter(params.slugOrID),
        addPublishingFilter(params.publishingFilter),
        addArticlePublishingFilter(params.publishingFilter),
      );

      yield* Effect.logDebug('where', where);

      const founded = yield* this.blogPostRepositorySrv.findUnique(reqCtx, {
        select: dbBlogPostSelect,
        where,
      });
      if (!founded) return yield* new NotFoundAPIError({});

      const published = yield* this.blogPostPublishingSrv.checkBlogPost(
        params.publishingFilter,
        founded,
      );

      return yield* this.blogPostAccessControlSrv.canReadBlogPost(
        reqCtx,
        published,
      );
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(BlogPostService, 'getOneBlogPost'),
    );
  }

  getMany(
    reqCtx: RequestContext,
    params: GetManyBlogPostParams,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostSegment | null>, ApiError> {
    return Effect.gen(this, function* getOneBlogPost() {
      yield* Effect.logDebug('params', params);

      const findParams: FindManyBlogPostRepositroeyParams<
        typeof dbBlogPostSegmentSelect
      > = {
        language: reqCtx.language,
        orderBy: sortToOrderBy(params.sort),
        select: dbBlogPostSegmentSelect,
        skip: params.page.offset,
        take: params.page.limit,
        where: {},
      };

      yield* Effect.logDebug('findParams', findParams);

      const founded = yield* this.blogPostRepositorySrv.findMany(
        reqCtx,
        findParams,
      );

      const published =
        yield* this.blogPostPublishingSrv.checkReadBlogPostItemsWithTotal(
          params.publishingFilter,
          founded,
        );

      return yield* this.blogPostAccessControlSrv.canReadBlogPostItemsWithTotal(
        reqCtx,
        published,
      );
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(BlogPostService, 'getMany'),
    );
  }
}
