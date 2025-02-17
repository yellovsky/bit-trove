// global modules
import { Effect } from 'effect';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import { ArticleSerializerService } from 'src/modules/article';

// local modules
import { BlogPostEntity } from '../entities/blog-post.entity';
import { BlogPostShortEntity } from '../entities/blog-post-short.entity';

import type {
  DBBlogPost,
  DBBlogPostShort,
} from '../repositories/blog-post.db-types';

@Injectable()
export class BlogPostSerializerService {
  constructor(
    @Inject()
    private readonly articleSerializerSrv: ArticleSerializerService,
  ) {}

  serialize(blogPost: DBBlogPost): Effect.Effect<BlogPostEntity, Error> {
    return Effect.gen(this, function* () {
      const translations = blogPost.article.translations.at(0);
      if (!translations) return yield* Effect.fail(new NotFoundException());

      return new BlogPostEntity({
        blocks: translations.blocks
          .sort((b1, b2) => b1.order - b2.order)
          .map((block) =>
            this.articleSerializerSrv.serializeArticleBlock(block),
          )
          .filter((v) => !!v),
        created_at: blogPost.created_at.toISOString(),
        id: blogPost.id,
        language_code: translations.language_code,
        language_codes: [],
        original_language_code: blogPost.article.original_language_code,
        published_at: blogPost.published_at?.toISOString() || null,
        seo_description: translations.seo_description,
        seo_keywords: translations.seo_keywords,
        seo_title: translations.seo_keywords,
        short_description: translations.short_description,
        slug: blogPost.slug,
        title: translations.title,
      });
    });
  }

  serializeShort(
    blogPost: DBBlogPostShort,
  ): Effect.Effect<BlogPostShortEntity, Error> {
    return Effect.gen(function* () {
      const translations = blogPost.article.translations.at(0);
      if (!translations) return yield* Effect.fail(new NotFoundException());

      return new BlogPostShortEntity({
        created_at: blogPost.created_at.toUTCString(),
        id: blogPost.id,
        language_code: translations.language_code,
        language_codes: [],
        original_language_code: 'blogPost.',
        published_at: blogPost.published_at?.toUTCString() || null,
        short_description: translations.short_description,
        slug: blogPost.slug,
        title: translations.title,
      });
    });
  }

  serializeShortList(
    blogPosts: Array<DBBlogPostShort | null>,
  ): Effect.Effect<Array<BlogPostShortEntity | null>, Error> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        !blogPost ? Effect.succeed(null) : this.serializeShort(blogPost),
      ),
    );
  }
}
