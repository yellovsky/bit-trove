// global modules
import { Either, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticlePublishingService } from 'src/modules/article';
import type { DBTutorialPublishing } from '../repositories/tutorial.db-models';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { PublishingFilter } from 'src/types/publishing-filter';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';

@Injectable()
export class TutorialPublishingrService {
  constructor(
    @Inject()
    private readonly articlePublisherSrv: ArticlePublishingService,
  ) {}

  checkTutorial<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorial: TTutorial,
  ): Either.Either<TTutorial, ApiError> {
    if (publishingFilter !== 'published') return Either.right(dbTutorial);
    if (!dbTutorial.published_at) Either.left(new NotFoundAPIError({}));

    return this.articlePublisherSrv
      .checkArticle(publishingFilter, dbTutorial.article)
      .pipe(Either.map((article) => ({ ...dbTutorial, article })));
  }

  checkReadTutorialItems<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorialList: Array<TTutorial | null>,
  ): Either.Either<Array<TTutorial | null>> {
    const items = dbTutorialList.map((dbTutorial) =>
      !dbTutorial
        ? null
        : pipe(
            this.checkTutorial(publishingFilter, dbTutorial),
            Either.getOrElse(() => null),
          ),
    );

    return Either.right(items);
  }

  checkReadTutorialItemsWithTotal<TTutorial extends DBTutorialPublishing>(
    publishingFilter: PublishingFilter,
    dbTutorialList: ItemsWithTotal<TTutorial | null>,
  ): Either.Either<ItemsWithTotal<TTutorial | null>> {
    return this.checkReadTutorialItems(
      publishingFilter,
      dbTutorialList.items,
    ).pipe(Either.map((items) => ({ items, total: dbTutorialList.total })));
  }
}
