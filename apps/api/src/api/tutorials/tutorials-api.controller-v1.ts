// global modules
import { Effect } from 'effect';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { Public } from 'src/modules/auth-jwt';
import { ReqContext } from 'src/request-context';
import type { RequestContext } from 'src/types/context';
import { RUNTIME_SRV, type RuntimeService } from 'src/modules/runtime';

import {
  TutorialListResponseEntity,
  TutorialResponseEntity,
} from 'src/entities/tutorial';

import {
  TUTORIAL_SERIALIZER_SRV,
  TUTORIAL_SRV,
  type TutorialSerializerService,
  type TutorialService,
} from 'src/modules/tutorial';

// local modules
import { FindManyTutorialsDTO } from './dto/find-many.dto';

@ApiTags('Tutorials')
@Controller({ path: 'tutorials', version: '1' })
export class TutorialsApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(TUTORIAL_SRV)
    private readonly tutorialSrv: TutorialService,

    @Inject(TUTORIAL_SERIALIZER_SRV)
    private readonly tutorialRerializerSrv: TutorialSerializerService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  @Public()
  async getTutorialList(
    @ReqContext() reqCtx: RequestContext,
    @Query() query: FindManyTutorialsDTO,
  ): Promise<TutorialListResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('query', query);

      const founded = yield* this.tutorialSrv.getMany(reqCtx, {
        ...query,
        publishingFilter: 'published',
      });

      return yield* this.tutorialRerializerSrv.serializeTutorialListResponse(
        reqCtx,
        {
          ...founded,
          ...query.page,
        },
      );
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: TutorialResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getTutorial(
    @ReqContext() reqCtx: RequestContext,
    @Param('slugOrID') slugOrID: string,
  ): Promise<TutorialResponseEntity> {
    const program = Effect.gen(this, function* () {
      const founded = yield* this.tutorialSrv.getOne(reqCtx, {
        publishingFilter: 'published',
        slugOrID,
      });

      return yield* this.tutorialRerializerSrv.serializeTutorialResponse(
        reqCtx,
        founded,
      );
    });

    return this.runtimeSrv.runPromise(program);
  }
}
