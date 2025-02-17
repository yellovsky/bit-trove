// global modules
import { Module } from '@nestjs/common';

// common modules
import { DrizzleModule } from 'src/modules/drizzle';

// local modules
import { ArticleObfuscationService } from './services/article-obfuscation.service';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleSerializerService } from './services/article-serializer.service';
import { ArticleTranslationService } from './services/article-translation.service';

@Module({
  exports: [
    ArticleTranslationService,
    ArticleObfuscationService,
    ArticleSerializerService,
    ArticleRepository,
  ],
  imports: [DrizzleModule],
  providers: [
    ArticleTranslationService,
    ArticleObfuscationService,
    ArticleSerializerService,
    ArticleRepository,
  ],
})
export class ArticleModule {}
