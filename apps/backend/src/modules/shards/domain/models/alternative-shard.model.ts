import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';

export interface AlternativeShardModelData {
  id: string;
  slug: string;
  languageCode: string;
  publishedAt: Date | null;
}

export class AlternativeShardModel {
  static from(data: AlternativeShardModelData) {
    return new AlternativeShardModel(data.id, data.slug, data.publishedAt, data.languageCode);
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly languageCode: string
  ) {}

  filterPublished(): ResultOrExcluded<AlternativeShardModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());
    return Either.right(this);
  }
}
