import type { ArticleWithRelation } from '@repo/api-models';

export interface ArticleRelationModel {
  id: string;
  sourceId: string;
  targetId: string;
  relationType: 'related' | 'furtherReading';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface RelatedArticleModel {
  article: ArticleWithRelation['article'];
  relationType: 'related' | 'furtherReading';
  direction: 'source' | 'target';
  order: number;
}

/**
 * Get the direction context for a given article ID
 */
export const getDirectionForArticle = (
  relation: ArticleRelationModel,
  articleId: string
): 'source' | 'target' | null => {
  if (relation.sourceId === articleId) return 'source';
  if (relation.targetId === articleId) return 'target';
  return null;
};

/**
 * Get the related article ID for a given article ID
 */
export const getRelatedArticleId = (relation: ArticleRelationModel, articleId: string): string | null => {
  if (relation.sourceId === articleId) return relation.targetId;
  if (relation.targetId === articleId) return relation.sourceId;
  return null;
};

/**
 * Check if a relation type is valid
 */
export const isValidRelationType = (type: string): type is 'related' | 'furtherReading' => {
  return ['related', 'furtherReading'].includes(type);
};

/**
 * Get display label for relation type
 */
export const getRelationTypeLabel = (type: 'related' | 'furtherReading'): string => {
  switch (type) {
    case 'related':
      return 'Related Articles';
    case 'furtherReading':
      return 'Further Reading';
    default:
      return 'Related';
  }
};

/**
 * Sort related articles by order
 */
export const sortRelatedArticles = (articles: ArticleWithRelation[]): ArticleWithRelation[] => {
  return [...articles].sort((a, b) => a.order - b.order);
};

/**
 * Group related articles by type
 */
export const groupRelatedArticlesByType = (
  articles: ArticleWithRelation[]
): Record<'related' | 'furtherReading', ArticleWithRelation[]> => {
  return articles.reduce(
    (acc, article) => {
      acc[article.relationType].push(article);
      return acc;
    },
    { furtherReading: [], related: [] } as Record<'related' | 'furtherReading', ArticleWithRelation[]>
  );
};
