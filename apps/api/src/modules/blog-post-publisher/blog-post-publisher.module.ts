// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticlePublisherModule } from 'src/modules/article-publisher';

// local modules
import { BLOG_POST_PUBLISHER_SRV } from './blog-post-publisher.types';
import { BlogPostPublisherServiceClass } from './blog-post-publisher.service';

@Module({
  exports: [
    {
      provide: BLOG_POST_PUBLISHER_SRV,
      useClass: BlogPostPublisherServiceClass,
    },
  ],
  imports: [ArticlePublisherModule],
  providers: [
    {
      provide: BLOG_POST_PUBLISHER_SRV,
      useClass: BlogPostPublisherServiceClass,
    },
  ],
})
export class BlogPostPublisherModule {}
