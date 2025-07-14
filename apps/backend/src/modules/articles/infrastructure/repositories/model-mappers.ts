import { AuthorModel } from 'src/shared/models/author.model';
import { SeoModel } from 'src/shared/models/seo.model';

import { TagModel } from 'src/modules/tags';

import { AlternativeArticleModel } from '../../domain/models/alternative-article.model';
import { ArticleModel } from '../../domain/models/article.model';
import { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import type { DBArticleRelation } from './article-relations.repository.types';
import type { DBArticle, DBShortArticle } from './articles.repository.types';

const getAuthor = (dbArticle: DBArticle | DBShortArticle): AuthorModel | null => {
  const authorId = dbArticle.author?.id;
  const authorName = dbArticle.author?.profiles.find((p) => p.isRoot)?.name;
  return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
};

const getSeo = (dbArticle: DBArticle | DBShortArticle): SeoModel | null => {
  return 'seoDescription' in dbArticle
    ? SeoModel.from({
        description: dbArticle.seoDescription,
        keywords: dbArticle.seoKeywords,
        title: dbArticle.seoTitle,
      })
    : null;
};

const getAlternatives = (dbArticle: DBArticle | DBShortArticle): AlternativeArticleModel[] => {
  return dbArticle.entry.articles
    .filter((a) => a.id !== dbArticle.id)
    .map((a) =>
      AlternativeArticleModel.from({
        id: a.id,
        languageCode: a.languageCode,
        publishedAt: a.publishedAt,
        slug: a.slug,
      })
    );
};

export const mapToArticleModel = (dbArticle: DBArticle | DBShortArticle): ArticleModel => {
  const contentJSON =
    'contentJSON' in dbArticle && typeof dbArticle.contentJSON === 'object' ? dbArticle.contentJSON : null;

  return ArticleModel.from({
    alternatives: getAlternatives(dbArticle),
    author: getAuthor(dbArticle),
    contentJSON,
    createdAt: dbArticle.createdAt,
    entryId: dbArticle.entry.id,
    id: dbArticle.id,
    languageCode: dbArticle.languageCode,
    publishedAt: dbArticle.publishedAt,
    readingTime: dbArticle.readingTime,
    seo: getSeo(dbArticle),
    shortDescription: dbArticle.shortDescription,
    slug: dbArticle.slug,
    tags: dbArticle.tags
      .sort((a, b) => a.order - b.order)
      .map((t) => TagModel.from({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
    title: dbArticle.title,
    type: dbArticle.type,
    updatedAt: dbArticle.updatedAt,
  });
};

export const mapToArticleWithRelationModel = (
  dbArticleRelation: DBArticleRelation,
  sourceId?: string
): ArticleWithRelationModel =>
  ArticleWithRelationModel.from({
    article: mapToArticleModel(dbArticleRelation.source),
    direction: sourceId === dbArticleRelation.source.id ? 'source' : 'target',
    id: dbArticleRelation.source.id,
    order: 0,
    relationType: 'related',
  });
