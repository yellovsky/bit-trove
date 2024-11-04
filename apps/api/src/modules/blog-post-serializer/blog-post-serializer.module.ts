// global modules
import { Module } from '@nestjs/common';

// local modules
import { BLOG_POST_SERIALIZER_SRV } from './blog-post-serializer.types';
import { BlogPostSerializerServiceClass } from './blog-post-serializer.service';

@Module({
  exports: [
    {
      provide: BLOG_POST_SERIALIZER_SRV,
      useClass: BlogPostSerializerServiceClass,
    },
  ],
  providers: [
    {
      provide: BLOG_POST_SERIALIZER_SRV,
      useClass: BlogPostSerializerServiceClass,
    },
  ],
})
export class BlogPostSerializerModule {}
