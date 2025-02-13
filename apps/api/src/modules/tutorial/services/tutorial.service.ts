// global modules
import type { InputJsonObject } from '@prisma/client/runtime/library';
import type { Prisma } from '@prisma/client';
import type { CMSTutorial, TutorialListFP } from '@repo/api-models';
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
import { TutorialAccessControlService } from './tutorial-access-control.service';
import { TutorialPublishingrService } from './tutorial-publishing.service';

import {
  type FindManyTutorialRepositoryParams,
  TutorialRepositoryService,
} from '../repositories/tutorial.repository';

import {
  type DBTutorial,
  type DBTutorialSegment,
  dbTutorialSegmentSelect,
  dbTutorialSelect,
} from '../repositories/tutorial.db-models';

export interface GetOneTutorialParams {
  slugOrID: string;
  publishingFilter: PublishingFilter;
}

export interface GetManyTutorialParams extends TutorialListFP {
  publishingFilter: PublishingFilter;
}

@Injectable()
export class TutorialService {
  constructor(
    @Inject()
    private readonly tutorialRepositorySrv: TutorialRepositoryService,

    @Inject()
    private readonly tutorialPublishingSrv: TutorialPublishingrService,

    @Inject()
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
      annotateLogs(TutorialService, 'getOneTutorial'),
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
      annotateLogs(TutorialService, 'getMany'),
    );
  }

  update(
    reqCtx: RequestContext,
    slug: string,
    data: CMSTutorial,
  ): Effect.Effect<DBTutorial, ApiError> {
    return Effect.gen(this, function* () {
      const tutorial = yield* this.tutorialRepositorySrv.findUnique(reqCtx, {
        select: dbTutorialSelect,
        where: { slug },
      });
      if (!tutorial) return yield* new NotFoundAPIError({});

      yield* this.tutorialAccessControlSrv.canUpdateTutorial(reqCtx, tutorial);

      const updated = yield* this.tutorialRepositorySrv.update(reqCtx, {
        select: dbTutorialSelect,
        where: { id: tutorial.id },

        data: {
          article: {
            update: {
              original_language: {
                connect: { code: data.translations[0].language_code },
              },

              translations: {
                create: data.translations.map((translation) => ({
                  language: { connect: { code: translation.language_code } },
                  title: translation.title,

                  seo_description: translation.seo_description,
                  seo_keywords: translation.seo_keywords,
                  seo_title: translation.seo_title,

                  blocks: {
                    create: translation.blocks.map((block, order) => ({
                      ...block,
                      content: block.content as InputJsonObject,
                      order,
                    })),
                  },
                  short_description: translation.short_description,
                })),
                deleteMany: {},
              },
            },
          },
        },
      });

      if (!updated) return yield* new NotFoundAPIError({});
      return updated;
    }).pipe(
      Effect.mapError(toApiError),
      annotateLogs(TutorialService, 'update'),
    );
  }
}
