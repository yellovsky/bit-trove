import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';

interface AlternativeArticleModelData {
  id: string;
  slug: string;
  languageCode: string;
  publishedAt: Date | null;
}

export class AlternativeArticleModel {
  static from(data: AlternativeArticleModelData) {
    return new AlternativeArticleModel(data.id, data.slug, data.publishedAt, data.languageCode);
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly languageCode: string
  ) {}

  filterPublished(): ResultOrExcluded<AlternativeArticleModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());
    return Either.right(this);
  }
}
