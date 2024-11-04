// global modules
import { Injectable } from '@nestjs/common';
import { Option } from 'effect';
import type { BlogPost, BlogPostResponse } from '@repo/api-models';

// common modules
import type { DBBlogPost } from 'src/db-models/blog-post';
import type { SerializerContext } from 'src/types/context';

// local modules
import type { BlogPostSerializerService } from './blog-post-serializer.types';

@Injectable()
export class BlogPostSerializerServiceClass
  implements BlogPostSerializerService
{
  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPost> {
    const optionalArticleTranslation = Option.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    );

    return Option.all({ articleTranslation: optionalArticleTranslation }).pipe(
      Option.map(({ articleTranslation }) => ({
        id: dbBlogPost.id,
        language_code: dbBlogPost.article.original_language_code,
        slug: dbBlogPost.slug,
        title: articleTranslation.title,
      })),
    );
  }

  serializeBlogPostResponse(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPostResponse> {
    return this.serializeBlogPost(ctx, dbBlogPost).pipe(
      Option.map((data) => ({ data })),
    );
  }
}
