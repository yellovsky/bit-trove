// global modules
import * as R from 'ramda';
import { Option, pipe, String } from 'effect';

// common modules
import type { DBArticle } from 'src/modules/article';

// local modules
import type { ArticleBlockEntity } from '../entities/article-block.entity';

import {
  ArticleCodeBlockContentEntity,
  ArticleCodeBlockEntity,
  ArticleCodeBlockVariantEntity,
} from '../entities/article-code-block.entity';

import {
  ArticleImageBlockContentEntity,
  ArticleImageBlockEntity,
} from '../entities/article-image-block.entity';

import {
  ArticleTextBlockContentEntity,
  ArticleTextBlockEntity,
} from '../entities/article-text-block.entity';

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

const serializeTextBlock = (
  block: DBArticle['translations'][number]['blocks'][number],
): Option.Option<ArticleTextBlockEntity> => {
  const contentText = pipe(
    Option.fromNullable(R.path(['content', 'text'], block)),
    Option.filter(String.isString),
  );
  const contentType = pipe(
    Option.fromNullable(R.path(['content', 'type'], block)),
    Option.filter((val) => val === 'md' || val === 'html'),
  );

  const maybeContent = pipe(
    Option.all({ text: contentText, type: contentType }),
    Option.map((content) => new ArticleTextBlockContentEntity(content)),
  );

  return pipe(
    maybeContent,
    Option.map(
      (content) =>
        new ArticleTextBlockEntity({
          content,
          subtitle: block.subtitle,
          title: block.title,
          type: 'text',
        }),
    ),
  );
};

const serializeImageBlock = (
  block: DBArticle['translations'][number]['blocks'][number],
): Option.Option<ArticleImageBlockEntity> => {
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
          subtitle: block.subtitle,
          title: block.title,
          type: 'image',
        }),
    ),
  );
};

const serializeCodeVariant = (
  data: unknown,
): Option.Option<ArticleCodeBlockVariantEntity> =>
  pipe(
    Option.fromNullable(data),
    Option.filter(isCodeVariant),
    Option.map(
      ({ language, text, filename = null, label = null }) =>
        new ArticleCodeBlockVariantEntity({ filename, label, language, text }),
    ),
  );

const serializeCodeBlock = (
  block: DBArticle['translations'][number]['blocks'][number],
): Option.Option<ArticleCodeBlockEntity> => {
  const maybeVariants = pipe(
    Option.fromNullable(R.path(['content', 'variants'], block)),
    Option.filter(Array.isArray),
    Option.flatMap((arr) => Option.all(arr.map(serializeCodeVariant))),
  );

  return pipe(
    Option.all({ variants: maybeVariants }),
    Option.map(
      ({ variants }) =>
        new ArticleCodeBlockEntity({
          content: new ArticleCodeBlockContentEntity({ variants }),
          subtitle: block.subtitle,
          title: block.title,
          type: 'code',
        }),
    ),
  );
};

export const serializeArticleBlock = (
  block: DBArticle['translations'][number]['blocks'][number],
): Option.Option<ArticleBlockEntity | null> =>
  Option.firstSomeOf([
    serializeImageBlock(block),
    serializeTextBlock(block),
    serializeCodeBlock(block),
  ]).pipe(Option.orElseSome(() => null));

export const serializeArticleBlockList = (
  blocks: DBArticle['translations'][number]['blocks'],
): Option.Option<ArticleBlockEntity[]> =>
  Option.all(
    blocks
      .sort((b1, b2) => b1.order - b2.order)
      .map((block) => serializeArticleBlock(block)),
  ).pipe(Option.map((arr) => arr.filter((item) => item !== null)));
