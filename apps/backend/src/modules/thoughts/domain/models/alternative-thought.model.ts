import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';

export interface AlternativeThoughtModelData {
  id: string;
  slug: string;
  languageCode: string;
  publishedAt: Date | null;
}

export class AlternativeThoughtModel {
  static from(data: AlternativeThoughtModelData) {
    return new AlternativeThoughtModel(data.id, data.slug, data.publishedAt, data.languageCode);
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly languageCode: string
  ) {}

  filterPublished(): ResultOrExcluded<AlternativeThoughtModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());
    return Either.right(this);
  }
}
