// global modules
import type { GuideItemListFP } from '@repo/api-models';
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
  DBGuide,
  DBGuideAccessControl,
  DBGuideFragment,
  DBGuidePublishing,
  DBGuideSegment,
} from 'src/db-models/guide';

import type {
  AccessControlContext,
  RepositoryContext,
  RequestContext,
  SerializerContext,
} from 'src/types/context';

import type {
  GuideEntity,
  GuideListResponseEntity,
  GuideResponseEntity,
  GuideSegmentEntity,
} from 'src/entities/guide';

// =================================================================================
//                       R E P O S I T O R Y
// =================================================================================
export interface FindUniqueGuideRepositroeyParams<
  TSelect extends Prisma.GuideSelect,
> {
  select: TSelect;
  where: Prisma.GuideWhereUniqueInput;
}

export interface FindManyGuideRepositoryParams<
  TSelect extends Prisma.GuideSelect,
> {
  select: TSelect;
  where: Prisma.GuideWhereInput;
  skip: number;
  take: number;
  language: string;
  orderBy: { title: Prisma.SortOrder } | { created_at: Prisma.SortOrder };
}

export interface GuideRepositoryService {
  findUnique<TSelect extends Prisma.GuideSelect>(
    ctx: RepositoryContext,
    params: FindUniqueGuideRepositroeyParams<TSelect>,
  ): Effect.Effect<DBGuideFragment<TSelect> | null, Error>;

  findMany<TSelect extends Prisma.GuideSelect>(
    ctx: RepositoryContext,
    params: FindManyGuideRepositoryParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBGuideFragment<TSelect> | null>, Error>;
}

// =================================================================================
//                      A C C E S S   C O N T R O L
// =================================================================================
export interface GuideAccessControlService {
  canReadGuide(
    ctx: AccessControlContext,
    dbGuide: DBGuide,
  ): Either.Either<DBGuide, ApiError>;

  canReadGuideItems<TGuide extends DBGuideAccessControl>(
    ctx: AccessControlContext,
    dbGuideSegmantList: Array<TGuide | null>,
  ): Either.Either<Array<TGuide | null>, ApiError>;

  canReadGuideItemsWithTotal<TGuide extends DBGuideAccessControl>(
    ctx: AccessControlContext,
    dbGuideSegmantList: ItemsWithTotal<TGuide | null>,
  ): Either.Either<ItemsWithTotal<TGuide | null>, ApiError>;
}

// =================================================================================
//                          P U B L I S H I N G
// =================================================================================
export interface GuidePublishingService {
  checkGuide<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuide: TGuide,
  ): Either.Either<TGuide, ApiError>;

  checkReadGuideItems<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuideSegmantList: Array<TGuide | null>,
  ): Either.Either<Array<TGuide | null>, ApiError>;

  checkReadGuideItemsWithTotal<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuideSegmantList: ItemsWithTotal<TGuide | null>,
  ): Either.Either<ItemsWithTotal<TGuide | null>, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface GuideSerializerService {
  serializeGuide(
    ctx: SerializerContext,
    dbGuide: DBGuide,
  ): Effect.Effect<GuideEntity, ApiError>;

  serializeGuideSegment(
    ctx: SerializerContext,
    dbGuide: DBGuideSegment,
  ): Effect.Effect<GuideSegmentEntity, ApiError>;

  serializeGuideResponse(
    ctx: SerializerContext,
    dbGuide: DBGuide,
  ): Effect.Effect<GuideResponseEntity, ApiError>;

  serializeGuideListResponse(
    ctx: SerializerContext,
    dbGuideList: ItemsWithTotalAndPagination<DBGuideSegment | null>,
  ): Effect.Effect<GuideListResponseEntity, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface GetOneGuideParams {
  slugOrID: string;
  publishingFilter: PublishingFilter;
}

export interface GetManyGuideParams extends GuideItemListFP {
  publishingFilter: PublishingFilter;
}

export interface GuideService {
  getOne(
    reqCtx: RequestContext,
    params: GetOneGuideParams,
  ): Effect.Effect<DBGuide, ApiError>;

  getMany(
    reqCtx: RequestContext,
    params: GetManyGuideParams,
  ): Effect.Effect<ItemsWithTotal<DBGuideSegment | null>, ApiError>;
}
