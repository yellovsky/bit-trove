// global modules
import { Effect } from 'effect';

// common modules
import { NotFoundAPIError } from 'src/exceptions';
import type { Serialize } from 'src/types/serializer';

// local modules
import type { DBTutorialSegment } from '../repositories/tutorial.db-models';
import { TutorialSegmentEntity } from '../entities/tutorial-segment.entity';

export const serializeTutorialSegment: Serialize<
  DBTutorialSegment,
  TutorialSegmentEntity
> = (ctx, dbTutorial) => {
  return Effect.all({
    articleTranslation: Effect.fromNullable(
      ctx.getTranslations(dbTutorial.article),
    ),
  }).pipe(
    Effect.map(
      ({ articleTranslation }) =>
        new TutorialSegmentEntity({
          created_at: dbTutorial.created_at.toUTCString(),
          id: dbTutorial.id,
          language_code: articleTranslation.language_code,
          original_language_code: dbTutorial.article.original_language_code,
          published_at: dbTutorial.published_at?.toUTCString() || null,
          short_description: articleTranslation.short_description,
          slug: dbTutorial.slug,
          title: articleTranslation.title,

          language_codes: dbTutorial.article.translations.map(
            (t) => t.language_code,
          ),
        }),
    ),
    Effect.mapError(() => new NotFoundAPIError({})),
  );
};
