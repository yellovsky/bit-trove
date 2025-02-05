// global modules
import { type Either, Option } from 'effect';

// common modules
import type { ApiError } from 'src/exceptions';
import type { ArticleBlockEntity } from 'src/entities/article';
import type { PublishingFilter } from 'src/types/publishing-filter';

import type {
  AccessControlContext,
  SerializerContext,
} from 'src/types/context';

import type {
  DBArticle,
  DBArticleAccessControl,
  DBArticlePublishing,
} from 'src/db-models/article';

// =================================================================================
//                  A C C E S S   C O N T R O L
// =================================================================================
export interface ArticleAccessControlService {
  canReadArticle<TArticle extends DBArticleAccessControl>(
    ctx: AccessControlContext,
    dbArticle: TArticle,
  ): Option.Option<TArticle>;
}

// =================================================================================
//                  P U B L I S H I N G
// =================================================================================
export interface ArticlePublishingService {
  checkArticle<TArticle extends DBArticlePublishing>(
    publishingFilter: PublishingFilter,
    dbArticle: TArticle,
  ): Either.Either<TArticle, ApiError>;
}

// =================================================================================
//                  S E R I A L I Z E R
// =================================================================================
export interface ArticleSerializerService {
  serializeBlock(
    ctx: SerializerContext,
    block: DBArticle['translations'][number]['blocks'][number],
  ): Option.Option<ArticleBlockEntity | null>;

  serializeBlockLists(
    ctx: SerializerContext,
    blocks: DBArticle['translations'][number]['blocks'],
  ): Option.Option<ArticleBlockEntity[]>;
}
