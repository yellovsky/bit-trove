import type { Prisma } from '@generated/prisma';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import { UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason } from 'src/shared/excluded';
import { SeoModel } from 'src/shared/models/seo.model';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { AlternativeBlogPostModel } from '../../domain/models/alternative-blog-post.model';
import { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';
import type {
  BlogPostRepository,
  CreateBlogPostParams,
  FindBySlugParams,
  FindManyBlogPostsParams,
} from '../../domain/repositories/blog-post.repository';
import {
  type DBLocalizedBlogPost,
  dbLocalizedBlogPostSelect,
  dbLocalizedShortBlogPostSelect,
} from './blog-post.repository.types';

const getWhere = (params: FindManyBlogPostsParams): Prisma.LocalizedBlogPostWhereInput => {
  const where: Prisma.LocalizedBlogPostWhereInput = {
    languageCode: { in: params.filter.languageCodeIn },
  };

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) {
    where.blogPost = where.blogPost ?? {};
    where.blogPost.authorId = params.filter.authorId;
  }

  return where;
};

@Injectable()
export class PrismaBlogPostRepository implements BlogPostRepository {
  #logger = new Logger(PrismaBlogPostRepository.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  createBlogPost(
    reqCtx: RequestContext,
    params: CreateBlogPostParams
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating blog post');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const publishedAt = params.published ? new Date() : null;

      // Create the blog post entry first
      const dbBlogPost = yield* Effect.tryPromise(() =>
        tx.blogPost.create({
          data: {
            authorId: reqCtx.accountId,
            publishedAt,
            slug: params.slug,
          },
          select: { id: true },
        })
      );

      // Create the localized blog post
      const dbLocalizedBlogPost = yield* Effect.tryPromise(() =>
        tx.localizedBlogPost.create({
          data: {
            blogPostId: dbBlogPost.id,
            contentJSON: params.contentJSON as Prisma.InputJsonValue,
            languageCode: params.languageCode,
            publishedAt,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            title: params.title,
          },
          select: dbLocalizedBlogPostSelect,
        })
      );

      return this.#mapToModel(dbLocalizedBlogPost);
    }).pipe(
      Effect.tapError((error) => {
        if (error instanceof UnknownException) this.#logger.error(`Error creating blog post: ${error.error}`);
        return Effect.void;
      })
    );
  }

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyBlogPostsParams
  ): Effect.Effect<LocalizedShortBlogPostModel[], UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.localizedBlogPost.findMany({
        orderBy: params.orderBy,
        select: dbLocalizedShortBlogPostSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(Effect.map((blogPosts) => blogPosts.map((bp) => this.#mapToShortLocalizedModel(bp))));
  }

  findTotalLocalized(reqCtx: RequestContext, params: FindManyBlogPostsParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.localizedBlogPost.count({ where: getWhere(params) }));
  }

  findOneLocalizedById(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      const blogPost = yield* Effect.tryPromise(() =>
        prisma.localizedBlogPost.findUnique({ select: dbLocalizedBlogPostSelect, where: { id } })
      );

      return !blogPost ? yield* Effect.fail(new NotFoundReason()) : this.#mapToModel(blogPost);
    });
  }

  findOneLocalizedBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<LocalizedBlogPostModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      const blogPost = yield* Effect.tryPromise(() =>
        prisma.localizedBlogPost.findFirst({
          select: dbLocalizedBlogPostSelect,
          where: { blogPost: { slug: params.slug }, languageCode: params.languageCode },
        })
      );

      return !blogPost ? yield* Effect.fail(new NotFoundReason()) : this.#mapToModel(blogPost);
    });
  }

  #mapToModel(dbLocalizedBlogPost: DBLocalizedBlogPost): LocalizedBlogPostModel {
    const alternatives = dbLocalizedBlogPost.blogPost.localizations
      .filter((bp) => bp.id !== dbLocalizedBlogPost.id)
      .map((bp) =>
        AlternativeBlogPostModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedBlogPost.blogPost.slug,
        })
      );

    return LocalizedBlogPostModel.from({
      alternatives,
      contentJSON: typeof dbLocalizedBlogPost.contentJSON === 'object' ? dbLocalizedBlogPost.contentJSON : null,
      id: dbLocalizedBlogPost.blogPost.id,
      languageCode: dbLocalizedBlogPost.languageCode,
      publishedAt: dbLocalizedBlogPost.blogPost.publishedAt,
      seo: SeoModel.from({
        description: dbLocalizedBlogPost.seoDescription,
        keywords: dbLocalizedBlogPost.seoKeywords,
        title: dbLocalizedBlogPost.seoTitle,
      }),
      shortDescription: dbLocalizedBlogPost.shortDescription,
      slug: dbLocalizedBlogPost.blogPost.slug,
      title: dbLocalizedBlogPost.title,
    });
  }

  #mapToShortLocalizedModel(dbLocalizedBlogPost: DBLocalizedBlogPost): LocalizedShortBlogPostModel {
    const alternatives = dbLocalizedBlogPost.blogPost.localizations
      .filter((bp) => bp.id !== dbLocalizedBlogPost.id)
      .map((bp) =>
        AlternativeBlogPostModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedBlogPost.blogPost.slug,
        })
      );

    return LocalizedShortBlogPostModel.from({
      alternatives,
      id: dbLocalizedBlogPost.id,
      languageCode: dbLocalizedBlogPost.languageCode,
      publishedAt: dbLocalizedBlogPost.publishedAt,
      shortDescription: dbLocalizedBlogPost.shortDescription,
      slug: dbLocalizedBlogPost.blogPost.slug,
      title: dbLocalizedBlogPost.title,
    });
  }
}
