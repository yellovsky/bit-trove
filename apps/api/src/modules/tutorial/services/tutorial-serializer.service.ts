// global modules
import { Effect } from 'effect';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import { ArticleSerializerService } from 'src/modules/article';

// local modules
import { CMSTutorialEntity } from '../entities/cms-tutorial.entity';
import { TutorialEntity } from '../entities/tutorial.entity';
import { TutorialShortEntity } from '../entities/tutorial-short.entity';

import type {
  DBTutorial,
  DBTutorialShort,
} from '../repositories/tutorial.db-types';

@Injectable()
export class TutorialSerializerService {
  constructor(
    @Inject()
    private readonly articleSerializerSrv: ArticleSerializerService,
  ) {}

  serialize(tutorial: DBTutorial): Effect.Effect<TutorialEntity, Error> {
    return Effect.gen(this, function* () {
      const translations = tutorial.article.translations.at(0);
      if (!translations) return yield* Effect.fail(new NotFoundException());

      return new TutorialEntity({
        blocks: translations.blocks
          .sort((b1, b2) => b1.order - b2.order)
          .map((block) =>
            this.articleSerializerSrv.serializeArticleBlock(block),
          )
          .filter((v) => !!v),
        created_at: tutorial.created_at.toISOString(),
        id: tutorial.id,
        language_code: translations.language_code,
        language_codes: [],
        original_language_code: tutorial.article.original_language_code,
        published_at: tutorial.published_at?.toISOString() || null,
        seo_description: translations.seo_description,
        seo_keywords: translations.seo_keywords,
        seo_title: translations.seo_keywords,
        short_description: translations.short_description,
        slug: tutorial.slug,
        title: translations.title,
      });
    });
  }

  serializeShort(
    tutorial: DBTutorialShort,
  ): Effect.Effect<TutorialShortEntity, Error> {
    return Effect.gen(function* () {
      const translations = tutorial.article.translations.at(0);
      if (!translations) return yield* Effect.fail(new NotFoundException());

      return new TutorialShortEntity({
        created_at: tutorial.created_at.toUTCString(),
        id: tutorial.id,
        language_code: translations.language_code,
        language_codes: [],
        original_language_code: 'tutorial.',
        published_at: tutorial.published_at?.toUTCString() || null,
        short_description: translations.short_description,
        slug: tutorial.slug,
        title: translations.title,
      });
    });
  }

  serializeShortList(
    tutorials: Array<DBTutorialShort | null>,
  ): Effect.Effect<Array<TutorialShortEntity | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        !tutorial ? Effect.succeed(null) : this.serializeShort(tutorial),
      ),
    );
  }

  serializeCMS(tutorial: DBTutorial): Effect.Effect<CMSTutorialEntity, Error> {
    return Effect.gen(this, function* () {
      return new CMSTutorialEntity({
        original_language_code: tutorial.article.original_language_code,
        translations: tutorial.article.translations.map((translations) => ({
          blocks: translations.blocks
            .sort((b1, b2) => b1.order - b2.order)
            .map((block) =>
              this.articleSerializerSrv.serializeArticleBlock(block),
            )
            .filter((v) => !!v),
          language_code: translations.language_code,
          seo_description: translations.seo_description,
          seo_keywords: translations.seo_keywords,
          seo_title: translations.seo_title,
          short_description: translations.short_description,
          title: translations.title,
        })),
      });
    });
  }
}
