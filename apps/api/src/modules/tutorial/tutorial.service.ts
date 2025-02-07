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
  type DBTutorial,
  type DBTutorialSegment,
  dbTutorialSegmentSelect,
  dbTutorialSelect,
} from 'src/db-models/tutorial';

import {
  addArticlePublishingFilter,
  addPublishingFilter,
  addSlugOrIDFilter,
} from 'src/utils/where';

// local modules
import {
  TUTORIAL_ACCESS_CONTROL_SRV,
  TUTORIAL_PUBLISHING_SRV,
  TUTORIAL_REPOSITORY_SRV,
} from './tutorial.constants';

import type {
  FindManyTutorialRepositoryParams,
  GetManyTutorialParams,
  GetOneTutorialParams,
  TutorialAccessControlService,
  TutorialPublishingService,
  TutorialRepositoryService,
  TutorialService,
} from './tutorial.types';

@Injectable()
export class TutorialServiceClass implements TutorialService {
  constructor(
    @Inject(TUTORIAL_REPOSITORY_SRV)
    private readonly tutorialRepositorySrv: TutorialRepositoryService,

    @Inject(TUTORIAL_PUBLISHING_SRV)
    private readonly tutorialPublishingSrv: TutorialPublishingService,

    @Inject(TUTORIAL_ACCESS_CONTROL_SRV)
    private readonly tutorialAccessControlSrv: TutorialAccessControlService,
  ) {}

  getOne(
    reqCtx: RequestContext,
    params: GetOneTutorialParams,
  ): Effect.Effect<DBTutorial, ApiError> {
    return Effect.gen(this, function* getOneTutorial() {
      const where: Prisma.TutorialWhereUniqueInput = pipe(
        {} as Partial<Prisma.TutorialWhereUniqueInput>,
        addSlugOrIDFilter(params.slugOrID),
        addPublishingFilter(params.publishingFilter),
        addArticlePublishingFilter(params.publishingFilter),
      );

      yield* Effect.logDebug('where', where);

      const founded = yield* this.tutorialRepositorySrv.findUnique(reqCtx, {
        select: dbTutorialSelect,
        where,
      });
      if (!founded) return yield* new NotFoundAPIError({});

      const published = yield* this.tutorialPublishingSrv.checkTutorial(
        params.publishingFilter,
        founded,
      );

      return yield* this.tutorialAccessControlSrv.canReadTutorial(
        reqCtx,
        published,
      );
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(TutorialServiceClass, 'getOneTutorial'),
    );
  }

  getMany(
    reqCtx: RequestContext,
    params: GetManyTutorialParams,
  ): Effect.Effect<ItemsWithTotal<DBTutorialSegment | null>, ApiError> {
    return Effect.gen(this, function* getOneTutorial() {
      yield* Effect.logDebug('params', params);

      const findParams: FindManyTutorialRepositoryParams<
        typeof dbTutorialSegmentSelect
      > = {
        language: reqCtx.language,
        orderBy: sortToOrderBy(params.sort),
        select: dbTutorialSegmentSelect,
        skip: params.page.offset,
        take: params.page.limit,
        where: {},
      };

      yield* Effect.logDebug('findParams', findParams);

      const founded = yield* this.tutorialRepositorySrv.findMany(
        reqCtx,
        findParams,
      );

      const published =
        yield* this.tutorialPublishingSrv.checkReadTutorialItemsWithTotal(
          params.publishingFilter,
          founded,
        );

      return yield* this.tutorialAccessControlSrv.canReadTutorialItemsWithTotal(
        reqCtx,
        published,
      );
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(TutorialServiceClass, 'getMany'),
    );
  }
}
