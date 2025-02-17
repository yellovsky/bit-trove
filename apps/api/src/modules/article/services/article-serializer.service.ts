// global modules
import type { ArticleBlock } from '@repo/api-models';
import { Injectable } from '@nestjs/common';

// common modules
import type { DBArticleBlockSelect } from 'src/db/schema';

// local modules
import {
  ArticleCodeBlockEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
} from '../../article';

@Injectable()
export class ArticleSerializerService {
  serializeArticleBlock(dbBlock: DBArticleBlockSelect): ArticleBlock | null {
    if (!dbBlock.content) return null;

    if (dbBlock.type === 'image' && 'url' in dbBlock.content) {
      return new ArticleImageBlockEntity({
        content: dbBlock.content,
        subtitle: dbBlock.subtitle,
        title: dbBlock.title,
        type: 'image',
      });
    }

    if (dbBlock.type === 'text' && 'text' in dbBlock.content) {
      return new ArticleTextBlockEntity({
        content: dbBlock.content,
        subtitle: dbBlock.subtitle,
        title: dbBlock.title,
        type: 'text',
      });
    }

    if (dbBlock.type === 'code' && 'variants' in dbBlock.content) {
      return new ArticleCodeBlockEntity({
        content: dbBlock.content,
        subtitle: dbBlock.subtitle,
        title: dbBlock.title,
        type: 'code',
      });
    }

    return null;
  }
}
