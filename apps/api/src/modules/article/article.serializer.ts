// global modules
import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { Option, pipe, String } from 'effect';

// common modules
import type { DBArticle } from 'src/db-models/article';
import type { SerializerContext } from 'src/types/context';

import {
  type ArticleBlockEntity,
  ArticleCodeBlockContentEntity,
  ArticleCodeBlockEntity,
  ArticleCodeBlockVariantEntity,
  ArticleImageBlockContentEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
  ArticleTextBlockHTMLContentEntity,
  ArticleTextBlockMDContentEntity,
} from 'src/entities/article';

// local modules
import type { ArticleSerializerService } from './article.types';

const isCodeVariant = (
  data: unknown,
): data is {
  language: string;
  text: string;
  filename?: string;
  label?: string;
} => {
  if (!data) return false;
  if (typeof data !== 'object') return false;

  const hasLanguage = 'language' in data && typeof data.language === 'string';
  if (!hasLanguage) return false;

  const hasText = 'text' in data && typeof data.text === 'string';
  if (!hasText) return false;

  const mayHaveFilename =
    'filename' in data
      ? typeof data.filename === 'string' || data.filename === null
      : true;
  if (!mayHaveFilename) return false;

  const mayHaveLabel =
    'label' in data
      ? typeof data.label === 'string' || data.label === null
      : true;
  if (!mayHaveLabel) return false;

  return true;
};

@Injectable()
export class ArticleSerializerServiceClass implements ArticleSerializerService {
  serializeBlock(
    ctx: SerializerContext,
    block: DBArticle['translations'][number]['blocks'][number],
  ): Option.Option<ArticleBlockEntity | null> {
    return Option.firstSomeOf([
      this.#serializeImageBlock(ctx, block),
      this.#serializeTextBlock(ctx, block),
      this.#serializeCodeBlock(ctx, block),
    ]).pipe(Option.orElseSome(() => null));
  }

  serializeBlockLists(
    ctx: SerializerContext,
    blocks: DBArticle['translations'][number]['blocks'],
  ): Option.Option<ArticleBlockEntity[]> {
    return Option.all(
      blocks.map((block) => this.serializeBlock(ctx, block)),
    ).pipe(Option.map((arr) => arr.filter((item) => item !== null)));
  }

  #serializeTextBlock(
    _ctx: SerializerContext,
    block: DBArticle['translations'][number]['blocks'][number],
  ): Option.Option<ArticleTextBlockEntity> {
    const maybeHTMLContent = pipe(
      Option.fromNullable(R.path(['content', 'html'], block)),
      Option.filter(String.isString),
      Option.map((html) => new ArticleTextBlockHTMLContentEntity({ html })),
    );

    const maybeMDContent = pipe(
      Option.fromNullable(R.path(['content', 'md'], block)),
      Option.filter(String.isString),
      Option.map((md) => new ArticleTextBlockMDContentEntity({ md })),
    );

    const maybeContent = Option.firstSomeOf([maybeHTMLContent, maybeMDContent]);

    return pipe(
      maybeContent,
      Option.map(
        (content) =>
          new ArticleTextBlockEntity({
            content,
            order: block.order,
            subtitle: block.subtitle,
            title: block.title,
            type: 'text',
          }),
      ),
    );
  }

  #serializeCodeBlock(
    _ctx: SerializerContext,
    block: DBArticle['translations'][number]['blocks'][number],
  ): Option.Option<ArticleCodeBlockEntity> {
    const maybeVariants = pipe(
      Option.fromNullable(R.path(['content', 'variants'], block)),
      Option.filter(Array.isArray),
      Option.flatMap((arr) => Option.all(arr.map(this.#serializeCodeVariant))),
    );

    return pipe(
      Option.all({ variants: maybeVariants }),
      Option.map(
        ({ variants }) =>
          new ArticleCodeBlockEntity({
            content: new ArticleCodeBlockContentEntity({ variants }),
            order: block.order,
            subtitle: block.subtitle,
            title: block.title,
            type: 'code',
          }),
      ),
    );
  }

  #serializeCodeVariant(
    data: unknown,
  ): Option.Option<ArticleCodeBlockVariantEntity> {
    return pipe(
      Option.fromNullable(data),
      Option.filter(isCodeVariant),
      Option.map(
        ({ language, text, filename = null, label = null }) =>
          new ArticleCodeBlockVariantEntity({
            filename,
            label,
            language,
            text,
          }),
      ),
    );
  }

  #serializeImageBlock(
    _ctx: SerializerContext,
    block: DBArticle['translations'][number]['blocks'][number],
  ): Option.Option<ArticleImageBlockEntity> {
    const maybeContent = pipe(
      Option.fromNullable(R.path(['content', 'url'], block)),
      Option.filter(String.isString),
      Option.map((url) => new ArticleImageBlockContentEntity({ url })),
    );

    return pipe(
      Option.all({ content: maybeContent }),
      Option.map(
        ({ content }) =>
          new ArticleImageBlockEntity({
            content,
            order: block.order,
            subtitle: block.subtitle,
            title: block.title,
            type: 'image',
          }),
      ),
    );
  }
}
