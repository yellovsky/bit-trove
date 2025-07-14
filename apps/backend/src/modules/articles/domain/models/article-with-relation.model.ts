import type { ArticleRelationDirection, ArticleRelationType } from '@repo/api-models';

import type { ArticleModel } from './article.model';

interface ArticleWithRelationModelData {
  id: string;
  article: ArticleModel;
  direction: ArticleRelationDirection;
  order: number;
  relationType: ArticleRelationType;
}

export class ArticleWithRelationModel {
  static from(data: ArticleWithRelationModelData) {
    return new ArticleWithRelationModel(data.id, data.article, data.direction, data.order, data.relationType);
  }

  constructor(
    public readonly id: string,
    public readonly article: ArticleModel,
    public readonly direction: ArticleRelationDirection,
    public readonly order: number,
    public readonly relationType: ArticleRelationType
  ) {}
}
