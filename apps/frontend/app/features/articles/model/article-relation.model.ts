import type { ArticleRelationType, ArticleWithRelation } from '@repo/api-models';

/**
 * Group related articles by type
 */
export const filterRelatedArticlesByType = (
  type: ArticleRelationType,
  articles: ArticleWithRelation[]
): ArticleWithRelation[] => articles.filter((article) => article.relationType === type);

/**
 * Group related articles by type
 */
export const groupRelatedArticlesByType = (
  articles: ArticleWithRelation[]
): Record<ArticleRelationType, ArticleWithRelation[]> =>
  articles.reduce(
    (acc, article) => {
      acc[article.relationType].push(article);
      return acc;
    },
    { furtherReading: [], related: [] } as Record<ArticleRelationType, ArticleWithRelation[]>
  );
