// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleAccessControlModule } from 'src/modules/article-access-control';

// local modules
import { BLOG_POST_ACCESS_CONTROL_SRV } from './blog-post-access-control.types';
import { BlogPostAccessControlServiceClass } from './blog-post-access-control.service';

@Module({
  exports: [
    {
      provide: BLOG_POST_ACCESS_CONTROL_SRV,
      useClass: BlogPostAccessControlServiceClass,
    },
  ],
  imports: [ArticleAccessControlModule],
  providers: [
    {
      provide: BLOG_POST_ACCESS_CONTROL_SRV,
      useClass: BlogPostAccessControlServiceClass,
    },
  ],
})
export class BlogPostAccessControlModule {}
