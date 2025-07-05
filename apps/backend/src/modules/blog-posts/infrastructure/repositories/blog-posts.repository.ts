import type { Prisma } from '@generated/prisma';
import type { InputJsonValue } from '@generated/prisma/runtime/library';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import { isUnknownException, type UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason, UnknownReason } from 'src/shared/excluded';
import { AuthorModel } from 'src/shared/models/author.model';
import { SeoModel } from 'src/shared/models/seo.model';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { calculateReadingTime } from 'src/shared/utils/reading-time';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';
import { TAGS_SRV, TagModel } from 'src/modules/tags';

import { AlternativeBlogPostModel } from '../../domain/models/alternative-blog-post.model';
import { BlogPostModel } from '../../domain/models/blog-post.model';
import type {
  BlogPostsRepository,
  CreateBlogPostParams,
  FindByIdParams,
  FindBySlugParams,
  FindManyBlogPostsParams,
  UpdateBlogPostParams,
} from '../../domain/repositories/blog-posts.repository';
import {
  type DBBlogPost,
  type DBShortBlogPost,
  dbBlogPostSelect,
  dbShortBlogPostSelect,
} from './blog-posts.repository.types';

const getWhere = (params: FindManyBlogPostsParams): Prisma.BlogPostWhereInput => {
  const where: Prisma.BlogPostWhereInput = {};

  if (params.filter.languageCodeIn?.length) {
    where.languageCode = { in: params.filter.languageCodeIn };
  }

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) where.authorId = params.filter.authorId;

  return where;
};

@Injectable()
export class PrismaBlogPostsRepository implements BlogPostsRepository {
  #logger = new Logger(PrismaBlogPostsRepository.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(TAGS_SRV)
    private readonly tagsSrv: IdentifierOf<typeof TAGS_SRV>
  ) {}

  createBlogPost(
    reqCtx: RequestContext,
    params: CreateBlogPostParams
  ): Effect.Effect<BlogPostModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating blog post');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const publishedAt = params.published ? new Date() : null;

      const entryId = params.entryId;
      const dbEntry = entryId
        ? yield* Effect.tryPromise(() => tx.blogPost.findUnique({ where: { id: entryId } }))
        : yield* Effect.tryPromise(() =>
            tx.blogPostEntry.create({ data: { authorId: reqCtx.accountId, publishedAt } })
          );

      if (!dbEntry) {
        this.#logger.error('  > no dbEntry');
        return yield* new UnknownReason();
      }

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbshard = yield* Effect.tryPromise(() =>
        tx.blogPost.create({
          data: {
            authorId: reqCtx.accountId,
            contentJSON: params.contentJSON as InputJsonValue,
            entryId: dbEntry.id,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            readingTime,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            slug: params.slug,
            title: params.title,
          },
          select: dbBlogPostSelect,
        })
      );

      return this.#mapToModel(dbshard);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating blog post ${error.error}`);
        return Effect.void;
      })
    );
  }

  updateBlogPost(
    reqCtx: RequestContext,
    id: string,
    params: UpdateBlogPostParams
  ): Effect.Effect<BlogPostModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating blog post');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const tags = yield* this.tagsSrv.getOrCreateTagsByNames(reqCtx, params.tags);

      // delete all tags before saving new ones
      yield* Effect.tryPromise(() => tx.blogPostTag.deleteMany({ where: { blogPostId: id } }));

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbshard = yield* Effect.tryPromise(() =>
        tx.blogPost.update({
          data: {
            contentJSON: params.contentJSON as InputJsonValue,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            readingTime,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            slug: params.slug,
            tags: { createMany: { data: tags.map((tag, order) => ({ order, tagId: tag.id })) } },
            title: params.title,
          },
          select: dbBlogPostSelect,
          where: { id },
        })
      );

      return this.#mapToModel(dbshard);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating blog post ${error.error}`);
        return Effect.void;
      })
    );
  }

  getBlogPostIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(() => tx.blogPost.findUnique({ where: { slug } })).pipe(
      Effect.map((shard) => shard?.id ?? null)
    );
  }

  findManyBlogPosts(
    reqCtx: RequestContext,
    params: FindManyBlogPostsParams
  ): Effect.Effect<BlogPostModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.blogPost.findMany({
        orderBy: params.orderBy,
        select: dbShortBlogPostSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((shards) => this.#logger.debug(`  > shards: ${JSON.stringify(shards)}`)),
      Effect.map((shards) => shards.map((t) => this.#mapToModel(t)))
    );
  }

  findTotalBlogPosts(reqCtx: RequestContext, params: FindManyBlogPostsParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.blogPost.count({ where: getWhere(params) }));
  }

  findOneBlogPostById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.BlogPostWhereUniqueInput = { id: params.id };
    if (params.published) where.publishedAt = { not: null };
    else if (params.published === false) where.publishedAt = null;

    if (params.authorId) where.authorId = params.authorId;

    return Effect.tryPromise(async () => prisma.blogPost.findUnique({ select: dbBlogPostSelect, where })).pipe(
      Effect.flatMap((dbLocalizedShard) =>
        !dbLocalizedShard ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbLocalizedShard))
      )
    );
  }

  findOneBlogPostBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.BlogPostWhereInput = { slug: params.slug };
    if (params.published) where.publishedAt = { not: null };
    else if (params.published === false) where.publishedAt = null;

    return Effect.tryPromise(async () => prisma.blogPost.findFirst({ select: dbBlogPostSelect, where })).pipe(
      Effect.flatMap((dbLocalizedShard) =>
        !dbLocalizedShard ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbLocalizedShard))
      )
    );
  }

  setBlogPostPublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    this.#logger.debug(`setBlogPostPublished ${id} ${published}`);
    return Effect.tryPromise(async () =>
      prisma.blogPost.update({
        data: { publishedAt: published ? new Date() : null },
        select: dbBlogPostSelect,
        where: { id },
      })
    ).pipe(
      Effect.tap((dbShard) => this.#logger.debug(`  > dbShard: ${JSON.stringify(dbShard)}`)),
      Effect.map((dbShard) => this.#mapToModel(dbShard))
    );
  }

  #getAuthor(dbBlogPost: DBBlogPost | DBShortBlogPost): AuthorModel | null {
    const authorId = dbBlogPost.author?.id;
    const authorName = dbBlogPost.author?.profiles.find((p) => p.isRoot)?.name;
    return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
  }

  #getSeo(dbBlogPost: DBBlogPost | DBShortBlogPost): SeoModel | null {
    return 'seoDescription' in dbBlogPost
      ? SeoModel.from({
          description: dbBlogPost.seoDescription,
          keywords: dbBlogPost.seoKeywords,
          title: dbBlogPost.seoTitle,
        })
      : null;
  }

  #getAlternatives(dbBlogPost: DBBlogPost | DBShortBlogPost): AlternativeBlogPostModel[] {
    return dbBlogPost.entry.blogPosts
      .filter((bp) => bp.id !== dbBlogPost.id)
      .map((bp) =>
        AlternativeBlogPostModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbBlogPost.slug,
        })
      );
  }

  #mapToModel(dbBlogPost: DBBlogPost | DBShortBlogPost): BlogPostModel {
    const contentJSON =
      'contentJSON' in dbBlogPost && typeof dbBlogPost.contentJSON === 'object' ? dbBlogPost.contentJSON : null;

    return BlogPostModel.from({
      alternatives: this.#getAlternatives(dbBlogPost),
      author: this.#getAuthor(dbBlogPost),
      contentJSON,
      createdAt: dbBlogPost.createdAt,
      entryId: dbBlogPost.entry.id,
      id: dbBlogPost.id,
      languageCode: dbBlogPost.languageCode,
      publishedAt: dbBlogPost.publishedAt,
      readingTime: dbBlogPost.readingTime,
      seo: this.#getSeo(dbBlogPost),
      shortDescription: dbBlogPost.shortDescription,
      slug: dbBlogPost.slug,
      tags: dbBlogPost.tags
        .sort((a, b) => a.order - b.order)
        .map((t) => TagModel.from({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
      title: dbBlogPost.title,
      updatedAt: dbBlogPost.updatedAt,
    });
  }
}
