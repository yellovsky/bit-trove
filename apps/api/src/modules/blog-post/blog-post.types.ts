// global modules
import type { BlogPostListFP } from '@repo/api-models';
import type { Prisma } from '@prisma/client';
import type { Effect, Either } from 'effect';

// common modules
import type { ApiError } from 'src/exceptions';
import type { PublishingFilter } from 'src/types/publishing-filter';

import type {
  ItemsWithTotal,
  ItemsWithTotalAndPagination,
} from 'src/types/items-with-total';

import type {
  DBBlogPost,
  DBBlogPostAccessControl,
  DBBlogPostFragment,
  DBBlogPostPublishing,
  DBBlogPostSegment,
} from 'src/db-models/blog-post';

import type {
  AccessControlContext,
  RepositoryContext,
  RequestContext,
  SerializerContext,
} from 'src/types/context';

import type {
  BlogPostEntity,
  BlogPostListResponseEntity,
  BlogPostResponseEntity,
  BlogPostSegmentEntity,
} from 'src/entities/blog-post';

// =================================================================================
//                       R E P O S I T O R Y
// =================================================================================
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

export interface BlogPostRepositoryService {
  findUnique<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindUniqueBlogPostRepositroeyParams<TSelect>,
  ): Effect.Effect<DBBlogPostFragment<TSelect> | null, Error>;

  findMany<TSelect extends Prisma.BlogPostSelect>(
    ctx: RepositoryContext,
    params: FindManyBlogPostRepositroeyParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostFragment<TSelect> | null>, Error>;
}

// =================================================================================
//                      A C C E S S   C O N T R O L
// =================================================================================
export interface BlogPostAccessControlService {
  canReadBlogPost(
    ctx: AccessControlContext,
    dbBlogPost: DBBlogPost,
  ): Either.Either<DBBlogPost, ApiError>;

  canReadBlogPostItems<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: Array<TBlogPost | null>,
  ): Either.Either<Array<TBlogPost | null>, ApiError>;

  canReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Either.Either<ItemsWithTotal<TBlogPost | null>, ApiError>;
}

// =================================================================================
//                          P U B L I S H I N G
// =================================================================================
export interface BlogPostPublishingService {
  checkBlogPost<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPost: TBlogPost,
  ): Either.Either<TBlogPost, ApiError>;

  checkReadBlogPostItems<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPostSegmantList: Array<TBlogPost | null>,
  ): Either.Either<Array<TBlogPost | null>, ApiError>;

  checkReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Either.Either<ItemsWithTotal<TBlogPost | null>, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface BlogPostSerializerService {
  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Effect.Effect<BlogPostEntity, ApiError>;

  serializeBlogPostSegment(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPostSegment,
  ): Effect.Effect<BlogPostSegmentEntity, ApiError>;

  serializeBlogPostResponse(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Effect.Effect<BlogPostResponseEntity, ApiError>;

  serializeBlogPostListResponse(
    ctx: SerializerContext,
    dbBlogPostList: ItemsWithTotalAndPagination<DBBlogPostSegment | null>,
  ): Effect.Effect<BlogPostListResponseEntity, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface GetOneBlogPostParams {
  slugOrID: string;
  publishingFilter: PublishingFilter;
}

export interface GetManyBlogPostParams extends BlogPostListFP {
  publishingFilter: PublishingFilter;
}

export interface BlogPostService {
  getOne(
    reqCtx: RequestContext,
    params: GetOneBlogPostParams,
  ): Effect.Effect<DBBlogPost, ApiError>;

  getMany(
    reqCtx: RequestContext,
    params: GetManyBlogPostParams,
  ): Effect.Effect<ItemsWithTotal<DBBlogPostSegment | null>, ApiError>;
}
