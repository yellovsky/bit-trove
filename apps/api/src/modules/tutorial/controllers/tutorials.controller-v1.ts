// global modules
import { Effect } from 'effect';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { defaultTranslationsStrategy } from 'src/utils/translation-strategy';
import { Public } from 'src/utils/access-control';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import { FindOneTutorialDTO } from '../dto/find-one-tutorial.dto';
import { TutorialAccessService } from '../services/tutorial-access.service';
import { TutorialListResponseEntity } from '../entities/tutorial-list-response.entity';
import { TutorialObfuscationService } from '../services/tutorial-obfuscation.service';
import { TutorialResponseEntity } from '../entities/tutorial-response.entity';
import { TutorialSerializerService } from '../services/tutorial-serializer.service';
import { TutorialService } from '../services/tutorial.service';
import { TutorialTranslationService } from '../services/tutorial-translation.service';

@ApiTags('Tutorials')
@Controller({ path: 'tutorials', version: '1' })
export class TutorialsV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly tutorialSrv: TutorialService,

    @Inject()
    private readonly tutorialTranslationSrv: TutorialTranslationService,

    @Inject()
    private readonly tutorialObfuscationSrv: TutorialObfuscationService,

    @Inject()
    private readonly tutorialSerializerSrv: TutorialSerializerService,

    @Inject()
    private readonly tutorialAccessSrv: TutorialAccessService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ description: 'Get tutorial list' })
  @ApiOkResponse({ type: TutorialListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  async getTutorialList(
    @Query() query: FindManyTutorialsDTO,
  ): Promise<TutorialListResponseEntity> {
    const program: Effect.Effect<TutorialListResponseEntity, Error> =
      Effect.gen(this, function* () {
        yield* Effect.logDebug('query', query);

        const [founded, total] = yield* Effect.all([
          this.tutorialSrv.getManyShort(null, query),
          this.tutorialSrv.getTotal(null, query),
        ]);

        const accessChecked = yield* this.tutorialAccessSrv.canReadFilter(
          null,
          founded,
        );

        const obfuscated = yield* this.tutorialObfuscationSrv
          .obfuscateShortList(null, 'published', accessChecked)
          .pipe(Effect.flatMap(Effect.fromNullable));

        const translationStrategy = defaultTranslationsStrategy(query.locale);
        const translated = yield* this.tutorialTranslationSrv
          .translateShortList(translationStrategy, obfuscated)
          .pipe(Effect.flatMap(Effect.fromNullable));

        const serialized = yield* this.tutorialSerializerSrv
          .serializeShortList(translated)
          .pipe(Effect.flatMap(Effect.fromNullable));

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

  @Public()
  @Get(':slugOrID')
  @ApiOperation({ description: 'Get tutorial by slug or id ' })
  @ApiOkResponse({ type: TutorialResponseEntity })
  @ApiCommonErrorResponses('not_found')
  async getOneTutorial(
    @Param('slugOrID') slugOrID: string,
    @Query() query: FindOneTutorialDTO,
  ): Promise<TutorialResponseEntity> {
    const program: Effect.Effect<TutorialResponseEntity, Error> = Effect.gen(
      this,
      function* () {
        const founded = yield* this.tutorialSrv.getOne(null, slugOrID);

        if (!(yield* this.tutorialAccessSrv.canRead(null, founded))) {
          return yield* Effect.fail(new ForbiddenException());
        }

        const obfuscated = yield* this.tutorialObfuscationSrv.obfuscate(
          null,
          'published',
          founded,
        );

        const translated = yield* this.tutorialTranslationSrv.translate(
          defaultTranslationsStrategy(query.locale),
          obfuscated,
        );

        const serialized =
          yield* this.tutorialSerializerSrv.serialize(translated);

        return new TutorialResponseEntity({ data: serialized });
      },
    );

    return this.runtimeSrv.runPromise(program);
  }
}
