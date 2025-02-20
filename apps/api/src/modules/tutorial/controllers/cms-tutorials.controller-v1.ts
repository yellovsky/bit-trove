// global modules
import { Effect } from 'effect';
import type { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';

// common modules
import { Account } from 'src/decorators/account.decorator';
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import type { DB } from 'src/db';
import type { DBAccount } from 'src/modules/account';
import { DRIZZLE_SRV } from 'src/modules/drizzle';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { CMSTutorialResponseEntity } from '../entities/cms-tutorial-response.entity';
import { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import { TutorialAccessService } from '../services/tutorial-access.service';
import { TutorialListResponseEntity } from '../entities/tutorial-list-response.entity';
import { TutorialSerializerService } from '../services/tutorial-serializer.service';
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
    private readonly tutorialSerializerSrv: TutorialSerializerService,

    @Inject()
    private readonly tutorialAccessSrv: TutorialAccessService,

    @Inject(DRIZZLE_SRV)
    private readonly db: DB,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get CMS tutorial list' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  async getTutorialList(
    @Req() req: Request,
    @Query() query: FindManyTutorialsDTO,
    @Account() account: DBAccount | null,
  ): Promise<TutorialListResponseEntity> {
    const program: Effect.Effect<TutorialListResponseEntity, Error> =
      Effect.gen(this, function* () {
        const [founded, total] = yield* Effect.all([
          this.tutorialSrv.getManyShort(null, query),
          this.tutorialSrv.getTotal(null, query),
        ]);

        const accessFiltered = yield* this.tutorialAccessSrv.canReadCMSFilter(
          account,
          founded,
        );

        const serialized =
          yield* this.tutorialSerializerSrv.serializeShortList(accessFiltered);

        return new TutorialListResponseEntity({
          data: serialized,
          meta: {
            pagination: {
              limit: query.page.limit,
              offset: query.page.offset,
              total,
            },
          },
        });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get CMS tutorial by slug' })
  @ApiOkResponse({ type: CMSTutorialResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Get(':slugOrID')
  async getTutorial(
    @Param('slugOrID') slugOrID: string,
    @Account() account: DBAccount | null,
  ): Promise<CMSTutorialResponseEntity> {
    const program: Effect.Effect<CMSTutorialResponseEntity, Error> = Effect.gen(
      this,
      function* () {
        const founded = yield* this.tutorialSrv.getOne(null, slugOrID);

        if (!(yield* this.tutorialAccessSrv.canReadCMS(account, founded))) {
          return yield* Effect.fail(new ForbiddenException());
        }

        const serialized =
          yield* this.tutorialSerializerSrv.serializeCMS(founded);

        return new CMSTutorialResponseEntity({ data: serialized });
      },
    );

    return this.runtimeSrv.runPromise(program);
  }

  @Put(':slug')
  @ApiOperation({ description: 'Update CMS tutorial by slug' })
  @ApiOkResponse({ type: CMSTutorialResponseEntity })
  @ApiCommonErrorResponses(
    'not_found',
    'bad_request',
    'forbidden',
    'not_found',
    'unauthorized',
  )
  async updateTutorial(
    @Body() body: UpdateCMSTutorialDTO,
    @Param('slug') slug: string,
    @Account() account: DBAccount | null,
  ): Promise<CMSTutorialResponseEntity> {
    return this.db.transaction(async (tx) => {
      const program: Effect.Effect<CMSTutorialResponseEntity, Error> =
        Effect.gen(this, function* () {
          const founded = yield* this.tutorialSrv.getOne(tx, slug);
          if (!this.tutorialAccessSrv.canUpdate(account, founded)) {
            return yield* Effect.fail(new ForbiddenException());
          }

          const updated = yield* this.tutorialSrv.update(tx, slug, body);
          const serialized =
            yield* this.tutorialSerializerSrv.serializeCMS(updated);

          return new CMSTutorialResponseEntity({ data: serialized });
        });

      return this.runtimeSrv.runPromise(program);
    });
  }
}
