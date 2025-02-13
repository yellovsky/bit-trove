// local modules
import type { ArticleCodeBlockEntity } from './article-code-block.entity';
import type { ArticleImageBlockEntity } from './article-image-block.entity';
import type { ArticleTextBlockEntity } from './article-text-block.entity';

export type ArticleBlockEntity =
  | ArticleTextBlockEntity
  | ArticleImageBlockEntity
  | ArticleCodeBlockEntity;
