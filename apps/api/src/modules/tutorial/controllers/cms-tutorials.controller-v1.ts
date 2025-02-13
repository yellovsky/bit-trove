// global modules
import { Effect } from 'effect';
import type { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import type { ApiError } from 'src/exceptions';
import { RequestContextService } from 'src/modules/request-context';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { CMSTutorialResponseEntity } from '../entities/cms-tutorial-response.entity';
import { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import { serializeCMSTutorialResponse } from '../serializers/cms-tutorial-response.serializer';
import { serializeTutorialListResponse } from '../serializers/tutorial-segment-list-response.serializer';
import { TutorialListResponseEntity } from '../entities/tutorial-list-response.entity';
import { TutorialService } from '../services/tutorial.service';
import { UpdateCMSTutorialDTO } from '../dto/update-tutorial.dto';

@ApiTags('CMS/Tutorials')
@Controller({ path: 'cms/tutorials', version: '1' })
export class CMSTutorialsV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly tutorialSrv: TutorialService,

    @Inject()
    private readonly requestContextSrv: RequestContextService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get CMS tutorial list' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  async getTutorialList(
    @Req() req: Request,
    @Query() query: FindManyTutorialsDTO,
  ): Promise<TutorialListResponseEntity> {
    const program: Effect.Effect<TutorialListResponseEntity, ApiError> =
      Effect.gen(this, function* () {
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

      return yield* serializeCMSTutorialResponse(reqCtx, founded);
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Update CMS tutorial by slug' })
  @ApiOkResponse({ type: CMSTutorialResponseEntity })
  @ApiCommonErrorResponses(
    'not_found',
    'bad_request',
    'forbidden',
    'not_found',
    'unauthorized',
  )
  @Put(':slug')
  async updateTutorial(
    @Req() req: Request,
    @Body() body: UpdateCMSTutorialDTO,
    @Param('slug') slug: string,
  ): Promise<CMSTutorialResponseEntity> {
    const program: Effect.Effect<CMSTutorialResponseEntity, ApiError> =
      Effect.gen(this, function* () {
        const reqCtx = yield* this.requestContextSrv.get(req);
        const updated = yield* this.tutorialSrv.update(reqCtx, slug, body);
        return yield* serializeCMSTutorialResponse(reqCtx, updated);
      });

    return this.runtimeSrv.runPromise(program);
  }
}
