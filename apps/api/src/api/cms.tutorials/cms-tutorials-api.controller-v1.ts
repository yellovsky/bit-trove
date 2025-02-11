// global modules
import { Effect } from 'effect';
import type { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { CMSTutorialResponseEntity } from 'src/entities/cms.tutorial';
import { TutorialListResponseEntity } from 'src/entities/tutorial';
import { RUNTIME_SRV, type RuntimeService } from 'src/modules/runtime';

import {
  TUTORIAL_SERIALIZER_SRV,
  TUTORIAL_SRV,
  type TutorialSerializerService,
  type TutorialService,
} from 'src/modules/tutorial';

import {
  REQUEST_CONTEXT_SRV,
  type RequestContextService,
} from 'src/modules/request-context';

// local modules
import { FindManyTutorialsDTO } from '../tutorials';

@ApiTags('CMS/Tutorials')
@Controller({ path: 'cms/tutorials', version: '1' })
export class CMSTutorialsApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(TUTORIAL_SRV)
    private readonly tutorialSrv: TutorialService,

    @Inject(TUTORIAL_SERIALIZER_SRV)
    private readonly tutorialRerializerSrv: TutorialSerializerService,

    @Inject(REQUEST_CONTEXT_SRV)
    private readonly requestContextSrv: RequestContextService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  async getTutorialList(
    @Req() req: Request,
    @Query() query: FindManyTutorialsDTO,
  ): Promise<TutorialListResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('query', query);

      const reqCtx = yield* this.requestContextSrv.get(req);
      const founded = yield* this.tutorialSrv.getMany(reqCtx, {
        ...query,
        publishingFilter: 'published',
      });

      return yield* this.tutorialRerializerSrv.serializeTutorialListResponse(
        reqCtx,
        { ...founded, ...query.page },
      );
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get CMS tutorial by slug' })
  @ApiOkResponse({ type: CMSTutorialResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Get(':slugOrID')
  async getTutorial(
    @Req() req: Request,
    @Param('slugOrID') slugOrID: string,
  ): Promise<CMSTutorialResponseEntity> {
    const program = Effect.gen(this, function* () {
      const reqCtx = yield* this.requestContextSrv.get(req);
      const founded = yield* this.tutorialSrv.getOne(reqCtx, {
        publishingFilter: 'any',
        slugOrID,
      });

      return yield* this.tutorialRerializerSrv.serializeCMSTutorialResponse(
        reqCtx,
        founded,
      );
    });

    return this.runtimeSrv.runPromise(program);
  }
}
