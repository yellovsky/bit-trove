// global modules
import { Effect } from 'effect';
import type { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { Public } from 'src/utils/access-control';
import { RequestContextService } from 'src/modules/request-context';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import { serializeTutorialListResponse } from '../serializers/tutorial-segment-list-response.serializer';
import { serializeTutorialResponse } from '../serializers/tutorial-response.serializer';
import { TutorialListResponseEntity } from '../entities/tutorial-list-response.entity';
import { TutorialResponseEntity } from '../entities/tutorial-response.entity';
import { TutorialService } from '../services/tutorial.service';

@ApiTags('Tutorials')
@Controller({ path: 'tutorials', version: '1' })
export class TutorialsV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly tutorialSrv: TutorialService,

    @Inject()
    private readonly requestContextSrv: RequestContextService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  @Public()
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

      return yield* serializeTutorialListResponse(reqCtx, {
        ...founded,
        ...query.page,
      });
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: TutorialResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getTutorial(
    @Req() req: Request,
    @Param('slugOrID') slugOrID: string,
  ): Promise<TutorialResponseEntity> {
    const program = Effect.gen(this, function* () {
      const reqCtx = yield* this.requestContextSrv.get(req);
      const founded = yield* this.tutorialSrv.getOne(reqCtx, {
        publishingFilter: 'published',
        slugOrID,
      });

      return yield* serializeTutorialResponse(reqCtx, founded);
    });

    return this.runtimeSrv.runPromise(program);
  }
}
