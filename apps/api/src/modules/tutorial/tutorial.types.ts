// global modules
import type { Prisma } from '@prisma/client';
import type { TutorialListFP } from '@repo/api-models';
import type { Effect, Either } from 'effect';

// common modules
import type { ApiError } from 'src/exceptions';
import type { PublishingFilter } from 'src/types/publishing-filter';

import type {
  ItemsWithTotal,
  ItemsWithTotalAndPagination,
} from 'src/types/items-with-total';

import type {
  DBTutorial,
  DBTutorialAccessControl,
  DBTutorialFragment,
  DBTutorialPublishing,
  DBTutorialSegment,
} from 'src/db-models/tutorial';

import type {
  AccessControlContext,
  RepositoryContext,
  RequestContext,
  SerializerContext,
} from 'src/types/context';

import type {
  TutorialEntity,
  TutorialListResponseEntity,
  TutorialResponseEntity,
  TutorialSegmentEntity,
} from 'src/entities/tutorial';

// =================================================================================
//                       R E P O S I T O R Y
// =================================================================================
export interface FindUniqueTutorialRepositroeyParams<
  TSelect extends Prisma.TutorialSelect,
> {
  select: TSelect;
  where: Prisma.TutorialWhereUniqueInput;
}

export interface FindManyTutorialRepositoryParams<
  TSelect extends Prisma.TutorialSelect,
> {
  select: TSelect;
  where: Prisma.TutorialWhereInput;
  skip: number;
  take: number;
  language: string;
  orderBy: { title: Prisma.SortOrder } | { created_at: Prisma.SortOrder };
}

export interface TutorialRepositoryService {
  findUnique<TSelect extends Prisma.TutorialSelect>(
    ctx: RepositoryContext,
    params: FindUniqueTutorialRepositroeyParams<TSelect>,
  ): Effect.Effect<DBTutorialFragment<TSelect> | null, Error>;

  findMany<TSelect extends Prisma.TutorialSelect>(
    ctx: RepositoryContext,
    params: FindManyTutorialRepositoryParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBTutorialFragment<TSelect> | null>, Error>;
}

// =================================================================================
//                      A C C E S S   C O N T R O L
// =================================================================================
export interface TutorialAccessControlService {
  canReadTutorial(
    ctx: AccessControlContext,
    dbTutorial: DBTutorial,
  ): Either.Either<DBTutorial, ApiError>;

  canReadTutorialItems<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorialSegmantList: Array<TTutorial | null>,
  ): Either.Either<Array<TTutorial | null>, ApiError>;

  canReadTutorialItemsWithTotal<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorialSegmantList: ItemsWithTotal<TTutorial | null>,
  ): Either.Either<ItemsWithTotal<TTutorial | null>, ApiError>;
}

// =================================================================================
//                          P U B L I S H I N G
// =================================================================================
export interface TutorialPublishingService {
  checkTutorial<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorial: TTutorial,
  ): Either.Either<TTutorial, ApiError>;

  checkReadTutorialItems<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorialSegmantList: Array<TTutorial | null>,
  ): Either.Either<Array<TTutorial | null>, ApiError>;

  checkReadTutorialItemsWithTotal<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorialSegmantList: ItemsWithTotal<TTutorial | null>,
  ): Either.Either<ItemsWithTotal<TTutorial | null>, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface TutorialSerializerService {
  serializeTutorial(
    ctx: SerializerContext,
    dbTutorial: DBTutorial,
  ): Effect.Effect<TutorialEntity, ApiError>;

  serializeTutorialSegment(
    ctx: SerializerContext,
    dbTutorial: DBTutorialSegment,
  ): Effect.Effect<TutorialSegmentEntity, ApiError>;

  serializeTutorialResponse(
    ctx: SerializerContext,
    dbTutorial: DBTutorial,
  ): Effect.Effect<TutorialResponseEntity, ApiError>;

  serializeTutorialListResponse(
    ctx: SerializerContext,
    dbTutorialList: ItemsWithTotalAndPagination<DBTutorialSegment | null>,
  ): Effect.Effect<TutorialListResponseEntity, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface GetOneTutorialParams {
  slugOrID: string;
  publishingFilter: PublishingFilter;
}

export interface GetManyTutorialParams extends TutorialListFP {
  publishingFilter: PublishingFilter;
}

export interface TutorialService {
  getOne(
    reqCtx: RequestContext,
    params: GetOneTutorialParams,
  ): Effect.Effect<DBTutorial, ApiError>;

  getMany(
    reqCtx: RequestContext,
    params: GetManyTutorialParams,
  ): Effect.Effect<ItemsWithTotal<DBTutorialSegment | null>, ApiError>;
}
