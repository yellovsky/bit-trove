// global modules
import { Either } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBGuideAccessControl } from 'src/db-models/guide';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { type ApiError, ForbiddenAPIError } from 'src/exceptions';

import {
  ARTICLE_ACCESS_CONTROL_SRV,
  type ArticleAccessControlService,
} from 'src/modules/article';

// local modules
import { GuideAccessControlService } from './guide.types';

@Injectable()
export class GuideAccessControlServiceClass
  implements GuideAccessControlService
{
  constructor(
    @Inject(ARTICLE_ACCESS_CONTROL_SRV)
    private readonly articleAccessControlSrv: ArticleAccessControlService,
  ) {}

  canReadGuide<TGuide extends DBGuideAccessControl>(
    ctx: AccessControlContext,
    dbGuide: TGuide,
  ): Either.Either<TGuide, ApiError> {
    const canRead =
      ctx.can('read', subject('guide', dbGuide)) &&
      this.articleAccessControlSrv.canReadArticle(ctx, dbGuide.article);

    return !canRead
      ? Either.left(new ForbiddenAPIError({}))
      : Either.right(dbGuide);
  }

  canReadGuideItems<TGuide extends DBGuideAccessControl>(
    ctx: AccessControlContext,
    dbGuideList: Array<TGuide | null>,
  ): Either.Either<Array<TGuide | null>, ApiError> {
    return Either.all(
      dbGuideList.map((item) =>
        !item
          ? Either.right(null)
          : this.canReadGuide(ctx, item).pipe(
              Either.orElse(() => Either.right(null)),
            ),
      ),
    );
  }

  canReadGuideItemsWithTotal<TGuide extends DBGuideAccessControl>(
    ctx: AccessControlContext,
    dbGuideSegmantList: ItemsWithTotal<TGuide | null>,
  ): Either.Either<ItemsWithTotal<TGuide | null>, ApiError> {
    return this.canReadGuideItems(ctx, dbGuideSegmantList.items).pipe(
      Either.map((items) => ({ items, total: dbGuideSegmantList.total })),
    );
  }
}
