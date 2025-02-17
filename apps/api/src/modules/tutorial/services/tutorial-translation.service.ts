// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticleTranslationService } from 'src/modules/article';
import type { GetTranslationsStrategy } from 'src/utils/translation-strategy';

// local modules
import type {
  DBTutorial,
  DBTutorialShort,
} from '../repositories/tutorial.db-types';

@Injectable()
export class TutorialTranslationService {
  constructor(
    @Inject()
    private readonly articleTranslationSrv: ArticleTranslationService,
  ) {}

  translateShort(
    translationStrategy: GetTranslationsStrategy,
    tutorialShort: DBTutorialShort,
  ): Effect.Effect<DBTutorialShort, Error> {
    return Effect.gen(this, function* () {
      return {
        ...tutorialShort,
        article: yield* this.articleTranslationSrv.translateShort(
          translationStrategy,
          tutorialShort.article,
        ),
      };
    });
  }

  translate(
    translationStrategy: GetTranslationsStrategy,
    tutorial: DBTutorial,
  ): Effect.Effect<DBTutorial, Error> {
    return Effect.gen(this, function* () {
      return {
        ...tutorial,
        article: yield* this.articleTranslationSrv.translate(
          translationStrategy,
          tutorial.article,
        ),
      };
    });
  }

  translateShortList(
    translationStrategy: GetTranslationsStrategy,
    tutorials: Array<DBTutorialShort | null>,
  ): Effect.Effect<Array<DBTutorialShort | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        !tutorial
          ? Effect.succeed(null)
          : this.translateShort(translationStrategy, tutorial),
      ),
    );
  }
}
