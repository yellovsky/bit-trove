import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';

export interface AlternativeBlogPostModelData {
  id: string;
  slug: string;
  languageCode: string;
  publishedAt: Date | null;
}

export class AlternativeBlogPostModel {
  static from(data: AlternativeBlogPostModelData) {
    return new AlternativeBlogPostModel(data.id, data.slug, data.publishedAt, data.languageCode);
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly languageCode: string
  ) {}

  filterPublished(): ResultOrExcluded<AlternativeBlogPostModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());
    return Either.right(this);
  }
}
