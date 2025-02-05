// global modules
import { Either, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBGuidePublishing } from 'src/db-models/guide';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { PublishingFilter } from 'src/types/publishing-filter';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';

import {
  ARTICLE_PUBLISHING_SRV,
  type ArticlePublishingService,
} from 'src/modules/article';

// local modules
import type { GuidePublishingService } from './guide.types';

@Injectable()
export class GuidePublishingrServiceClass implements GuidePublishingService {
  constructor(
    @Inject(ARTICLE_PUBLISHING_SRV)
    private readonly articlePublisherSrv: ArticlePublishingService,
  ) {}

  checkGuide<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuide: TGuide,
  ): Either.Either<TGuide, ApiError> {
    if (publishingFilter !== 'published') return Either.right(dbGuide);
    if (!dbGuide.published_at) Either.left(new NotFoundAPIError({}));

    return this.articlePublisherSrv
      .checkArticle(publishingFilter, dbGuide.article)
      .pipe(Either.map((article) => ({ ...dbGuide, article })));
  }

  checkReadGuideItems<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuideList: Array<TGuide | null>,
  ): Either.Either<Array<TGuide | null>> {
    const items = dbGuideList.map((dbGuide) =>
      !dbGuide
        ? null
        : pipe(
            this.checkGuide(publishingFilter, dbGuide),
            Either.getOrElse(() => null),
          ),
    );

    return Either.right(items);
  }

  checkReadGuideItemsWithTotal<TGuide extends DBGuidePublishing>(
    publishingFilter: PublishingFilter,
    dbGuideList: ItemsWithTotal<TGuide | null>,
  ): Either.Either<ItemsWithTotal<TGuide | null>> {
    return this.checkReadGuideItems(publishingFilter, dbGuideList.items).pipe(
      Either.map((items) => ({ items, total: dbGuideList.total })),
    );
  }
}
