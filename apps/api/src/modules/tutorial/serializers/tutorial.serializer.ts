// global modules
import { Effect, pipe } from 'effect';

// common modules
import { NotFoundAPIError } from 'src/exceptions';
import type { Serialize } from 'src/types/serializer';
import { serializeArticleBlockList } from 'src/modules/article';

// local modules
import type { DBTutorial } from '../repositories/tutorial.db-models';
import { serializeTutorialSegment } from './tutorial-segment.serializer';
import { TutorialEntity } from '../entities/tutorial.entity';

export const serializeTutorial: Serialize<DBTutorial, TutorialEntity> = (
  ctx,
  dbTutorial,
) => {
  const segment = serializeTutorialSegment(ctx, dbTutorial);
  const articleTranslation = Effect.fromNullable(
    ctx.getTranslations(dbTutorial.article),
  );
  const blocks = pipe(
    articleTranslation,
    Effect.flatMap((t) => serializeArticleBlockList(ctx, t.blocks)),
  );

  return Effect.all({ articleTranslation, blocks, segment }).pipe(
    Effect.map(
      ({ articleTranslation, blocks, segment }) =>
        new TutorialEntity({
          ...segment,
          blocks,
          seo_description: articleTranslation.seo_description,
          seo_keywords: articleTranslation.seo_keywords,
          seo_title: articleTranslation.seo_title,
        }),
    ),
    Effect.mapError(() => new NotFoundAPIError({})),
  );
};
