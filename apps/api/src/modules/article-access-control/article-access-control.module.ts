// global modules
import { Module } from '@nestjs/common';

// local modules
import { ARTICLE_ACCESS_CONTROL_SRV } from './article-access-control.types';
import { ArticleAccessControlServiceClass } from './article-access-control.service';

@Module({
  exports: [
    {
      provide: ARTICLE_ACCESS_CONTROL_SRV,
      useClass: ArticleAccessControlServiceClass,
    },
  ],
  providers: [
    {
      provide: ARTICLE_ACCESS_CONTROL_SRV,
      useClass: ArticleAccessControlServiceClass,
    },
  ],
})
export class ArticleAccessControlModule {}
