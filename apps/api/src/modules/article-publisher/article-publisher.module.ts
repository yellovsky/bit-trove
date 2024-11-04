// global modules
import { Module } from '@nestjs/common';

// local modules
import { ARTICLE_PUBLISHER_SRV } from './article-publisher.types';
import { ArticlePublisherServiceClass } from './article-publisher.service';

@Module({
  exports: [
    {
      provide: ARTICLE_PUBLISHER_SRV,
      useClass: ArticlePublisherServiceClass,
    },
  ],
  providers: [
    {
      provide: ARTICLE_PUBLISHER_SRV,
      useClass: ArticlePublisherServiceClass,
    },
  ],
})
export class ArticlePublisherModule {}
