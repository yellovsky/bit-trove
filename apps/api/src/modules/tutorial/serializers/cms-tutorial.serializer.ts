// global modules
import { Effect, Option } from 'effect';

// common modules
import type { Serialize } from 'src/types/serializer';
import { serializeArticleBlockList } from 'src/modules/article';

// local modules
import type { DBTutorial } from '../repositories/tutorial.db-models';

import {
  CMSTutorialEntity,
  CMSTutorialTranslationsEntity,
} from '../entities/cms-tutorial.entity';

export const serializeCMSTutorial: Serialize<DBTutorial, CMSTutorialEntity> = (
  ctx,
  dbTutorial,
) => {
  const translationOptions = dbTutorial.article.translations.map((t) =>
    serializeArticleBlockList(ctx, t.blocks).pipe(
      Option.map(
        (blocks) =>
          new CMSTutorialTranslationsEntity({
            blocks,

            language_code: t.language_code,
            seo_description: t.seo_description,
            seo_keywords: t.seo_keywords,
            seo_title: t.seo_title,
            short_description: t.short_description,
            title: t.title,
          }),
      ),
    ),
  );

  const translations = Option.all(translationOptions).pipe(
    Option.getOrElse(() => [] as CMSTutorialTranslationsEntity[]),
  );

  return Effect.succeed(new CMSTutorialEntity({ translations }));
};
