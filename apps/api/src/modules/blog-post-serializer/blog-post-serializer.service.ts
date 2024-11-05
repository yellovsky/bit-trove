// global modules
import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { Option, pipe } from 'effect';

import type {
  ArticleBlock,
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
  BlogPost,
  BlogPostListResponse,
  BlogPostResponse,
  BlogPostSegment,
} from '@repo/api-models';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import type { SerializerContext } from 'src/types/context';
import type { DBBlogPost, DBBlogPostSegment } from 'src/db-models/blog-post';

// local modules
import type { BlogPostSerializerService } from './blog-post-serializer.types';

const isBaseBlock = (
  block: object,
): block is Omit<ArticleBlock, 'content'> & { content: object } =>
  'type' in block &&
  typeof block.type === 'string' &&
  'order' in block &&
  typeof block.order === 'number' &&
  'content' in block &&
  !!block.content &&
  typeof block.content === 'object';

const isArticleImageBlock = (block: object): block is ArticleImageBlock =>
  isBaseBlock(block) &&
  block.type === 'image' &&
  'src' in block.content &&
  typeof block.content.src === 'string';

const isArticleTextBlock = (block: object): block is ArticleTextBlock =>
  isBaseBlock(block) &&
  block.type === 'text' &&
  (('html' in block.content && typeof block.content.html === 'string') ||
    ('md' in block.content && typeof block.content.md === 'string'));

const isArticleCodeBlock = (block: object): block is ArticleCodeBlock =>
  isBaseBlock(block) &&
  block.type === 'code' &&
  'variants' in block.content &&
  Array.isArray(block.content.variants) &&
  block.content.variants.every(
    (variant) =>
      !!variant &&
      typeof variant === 'object' &&
      'language' in variant &&
      typeof variant.language === 'string' &&
      'text' in variant &&
      typeof variant.text === 'string',
  );

const isBlock = (block: object): block is ArticleBlock =>
  isArticleTextBlock(block) ||
  isArticleImageBlock(block) ||
  isArticleCodeBlock(block);

@Injectable()
export class BlogPostSerializerServiceClass
  implements BlogPostSerializerService
{
  serializeBlogPostSegment(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPostSegment,
  ): Option.Option<BlogPostSegment> {
    const optionalArticleTranslation = Option.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    );

    return Option.all({ articleTranslation: optionalArticleTranslation }).pipe(
      Option.map(({ articleTranslation }) => ({
        created_at: dbBlogPost.created_at.toUTCString(),
        id: dbBlogPost.id,
        original_language_code: dbBlogPost.article.original_language_code,
        published_at: dbBlogPost.published_at?.toUTCString() || null,
        short_description: articleTranslation.short_description,
        slug: dbBlogPost.slug,
        title: articleTranslation.title,
      })),
    );
  }

  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPost> {
    const optionalArtickeTranslation = Option.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    );
    const optionalSegment = this.serializeBlogPostSegment(ctx, dbBlogPost);

    return Option.all({
      articleTranslation: optionalArtickeTranslation,
      segment: optionalSegment,
    }).pipe(
      Option.map(({ articleTranslation, segment }) => ({
        ...segment,
        blocks: R.sortBy(
          R.prop('order'),
          articleTranslation.blocks.filter(isBlock),
        ),
        seo_description: articleTranslation.seo_description,
        seo_keywords: articleTranslation.seo_keywords,
        seo_title: articleTranslation.seo_title,
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

  serializeBlogPostListResponse(
    ctx: SerializerContext,
    dbBlogPostList: ItemsWithTotalAndPagination<DBBlogPostSegment | null>,
  ): Option.Option<BlogPostListResponse> {
    const items = Option.all(
      dbBlogPostList.items.map((item) =>
        pipe(
          Option.fromNullable(item),
          Option.flatMap((item) => this.serializeBlogPostSegment(ctx, item)),
          Option.orElseSome(() => null),
        ),
      ),
    );

    return items.pipe(
      Option.map((data) => ({
        data,
        meta: {
          pagination: {
            limit: dbBlogPostList.limit,
            offset: dbBlogPostList.offset,
            total: dbBlogPostList.total,
          },
        },
      })),
    );
  }
}
