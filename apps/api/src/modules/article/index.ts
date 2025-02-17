export { ArticleModule } from './article.module';

export { UpdateCMSArticleDTO } from './dto/update-article.dto';

export type { ArticleBlockEntity } from './entities/article-block.entity';
export { ArticleCodeBlockEntity } from './entities/article-code-block.entity';
export { ArticleTextBlockEntity } from './entities/article-text-block.entity';
export { ArticleImageBlockEntity } from './entities/article-image-block.entity';

export {
  serializeArticleBlock,
  serializeArticleBlockList,
} from './serializers/article-block.serializer';

export type {
  DBArticle,
  DBArticleShort,
} from './repositories/article.db-types';

export { ArticleAccessService } from './services/article-access.service';
export { ArticleObfuscationService } from './services/article-obfuscation.service';
export { ArticleTranslationService } from './services/article-translation.service';
export { ArticleSerializerService } from './services/article-serializer.service';
export { ArticleRepository } from './repositories/article.repository';
