// global modules
import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { Option } from 'effect';

import type {
  ArticleBlock,
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
  BlogPost,
  BlogPostResponse,
} from '@repo/api-models';

// common modules
import type { DBBlogPost } from 'src/db-models/blog-post';
import type { SerializerContext } from 'src/types/context';

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
  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPost> {
    const optionalArticleTranslation = Option.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    );

    return Option.all({ articleTranslation: optionalArticleTranslation }).pipe(
      Option.map(({ articleTranslation }) => ({
        blocks: R.sortBy(
          R.prop('order'),
          articleTranslation.blocks.filter(isBlock),
        ),
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
