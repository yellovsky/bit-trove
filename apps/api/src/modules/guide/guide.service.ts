// global modules
import type { Prisma } from '@prisma/client';
import { Effect, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { annotateLogs } from 'src/modules/runtime';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RequestContext } from 'src/types/context';
import { sortToOrderBy } from 'src/utils/sort-to-order-by';
import { type ApiError, NotFoundAPIError, toApiError } from 'src/exceptions';

import {
  type DBGuide,
  type DBGuideSegment,
  dbGuideSegmentSelect,
  dbGuideSelect,
} from 'src/db-models/guide';

import {
  addArticlePublishingFilter,
  addPublishingFilter,
  addSlugOrIDFilter,
} from 'src/utils/where';

// local modules

import {
  GUIDE_ACCESS_CONTROL_SRV,
  GUIDE_PUBLISHING_SRV,
  GUIDE_REPOSITORY_SRV,
} from './guide.constants';

import type {
  FindManyGuideRepositoryParams,
  GetManyGuideParams,
  GetOneGuideParams,
  GuideAccessControlService,
  GuidePublishingService,
  GuideRepositoryService,
  GuideService,
} from './guide.types';

@Injectable()
export class GuideServiceClass implements GuideService {
  constructor(
    @Inject(GUIDE_REPOSITORY_SRV)
    private readonly guideRepositorySrv: GuideRepositoryService,

    @Inject(GUIDE_PUBLISHING_SRV)
    private readonly guidePublishingSrv: GuidePublishingService,

    @Inject(GUIDE_ACCESS_CONTROL_SRV)
    private readonly guideAccessControlSrv: GuideAccessControlService,
  ) {}

  getOne(
    reqCtx: RequestContext,
    params: GetOneGuideParams,
  ): Effect.Effect<DBGuide, ApiError> {
    return Effect.gen(this, function* getOneGuide() {
      const where: Prisma.GuideWhereUniqueInput = pipe(
        {} as Partial<Prisma.GuideWhereUniqueInput>,
        addSlugOrIDFilter(params.slugOrID),
        addPublishingFilter(params.publishingFilter),
        addArticlePublishingFilter(params.publishingFilter),
      );

      yield* Effect.logDebug('where', where);

      const founded = yield* this.guideRepositorySrv.findUnique(reqCtx, {
        select: dbGuideSelect,
        where,
      });
      if (!founded) return yield* new NotFoundAPIError({});

      const published = yield* this.guidePublishingSrv.checkGuide(
        params.publishingFilter,
        founded,
      );

      return yield* this.guideAccessControlSrv.canReadGuide(reqCtx, published);
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(GuideServiceClass, 'getOneGuide'),
    );
  }

  getMany(
    reqCtx: RequestContext,
    params: GetManyGuideParams,
  ): Effect.Effect<ItemsWithTotal<DBGuideSegment | null>, ApiError> {
    return Effect.gen(this, function* getOneGuide() {
      yield* Effect.logDebug('params', params);

      const findParams: FindManyGuideRepositoryParams<
        typeof dbGuideSegmentSelect
      > = {
        language: reqCtx.language,
        orderBy: sortToOrderBy(params.sort),
        select: dbGuideSegmentSelect,
        skip: params.page.offset,
        take: params.page.limit,
        where: {},
      };

      yield* Effect.logDebug('findParams', findParams);

      const founded = yield* this.guideRepositorySrv.findMany(
        reqCtx,
        findParams,
      );

      const published =
        yield* this.guidePublishingSrv.checkReadGuideItemsWithTotal(
          params.publishingFilter,
          founded,
        );

      return yield* this.guideAccessControlSrv.canReadGuideItemsWithTotal(
        reqCtx,
        published,
      );
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(GuideServiceClass, 'getMany'),
    );
  }
}
