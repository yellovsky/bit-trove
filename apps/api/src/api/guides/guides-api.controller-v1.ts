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
  GuideListResponseEntity,
  GuideResponseEntity,
} from 'src/entities/guide';

import {
  GUIDE_SERIALIZER_SRV,
  GUIDE_SRV,
  type GuideSerializerService,
  type GuideService,
} from 'src/modules/guide';

// local modules
import { FindManyGuidesDTO } from './dto/find-many.dto';

@ApiTags('Guides')
@Controller({ path: 'guides', version: '1' })
export class GuidesApiV1Controller {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtimeSrv: RuntimeService,

    @Inject(GUIDE_SRV)
    private readonly guideSrv: GuideService,

    @Inject(GUIDE_SERIALIZER_SRV)
    private readonly guideRerializerSrv: GuideSerializerService,
  ) {}

  @ApiOperation({ description: 'Get one blog posts' })
  @ApiOkResponse({ type: GuideListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  @Get()
  @Public()
  async getGuideList(
    @ReqContext() reqCtx: RequestContext,
    @Query() query: FindManyGuidesDTO,
  ): Promise<GuideListResponseEntity> {
    const program = Effect.gen(this, function* () {
      yield* Effect.logDebug('query', query);

      const founded = yield* this.guideSrv.getMany(reqCtx, {
        ...query,
        publishingFilter: 'published',
      });

      return yield* this.guideRerializerSrv.serializeGuideListResponse(reqCtx, {
        ...founded,
        ...query.page,
      });
    });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: GuideResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getGuide(
    @ReqContext() reqCtx: RequestContext,
    @Param('slugOrID') slugOrID: string,
  ): Promise<GuideResponseEntity> {
    const program = Effect.gen(this, function* () {
      const founded = yield* this.guideSrv.getOne(reqCtx, {
        publishingFilter: 'published',
        slugOrID,
      });

      return yield* this.guideRerializerSrv.serializeGuideResponse(
        reqCtx,
        founded,
      );
    });

    return this.runtimeSrv.runPromise(program);
  }
}
