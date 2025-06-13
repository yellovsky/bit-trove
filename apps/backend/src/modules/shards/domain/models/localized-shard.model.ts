import { Either } from 'effect';

import type { JSONContent } from '@repo/api-models';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { AuthorModel } from 'src/shared/models/author.model';
import type { SeoModel } from 'src/shared/models/seo.model';

import type { AlternativeShardModel } from './alternative-shard.model';

interface ShardModelData {
  id: string;
  languageCode: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  shortDescription: string | null;
  slug: string;
  title: string;
  contentJSON: JSONContent | null;
  seo: SeoModel;
  alternatives: AlternativeShardModel[];
  author: AuthorModel | null;
}

export class LocalizedShardModel {
  static from(data: ShardModelData) {
    return new LocalizedShardModel(
      data.id,
      data.slug,
      data.publishedAt,
      data.title,
      data.shortDescription,
      data.languageCode,
      data.seo,
      data.alternatives,
      data.contentJSON,
      data.createdAt,
      data.updatedAt,
      data.author
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly title: string,
    public readonly shortDescription: string | null,
    public readonly languageCode: string,
    public readonly seo: SeoModel,
    public readonly alternatives: AlternativeShardModel[],
    public readonly contentJSON: JSONContent | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly author: AuthorModel | null
  ) {}

  filterPublished(): ResultOrExcluded<LocalizedShardModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());

    const alternatives = this.alternatives
      .map((alternative) => alternative.filterPublished())
      .map((alternative) => Either.getOrNull(alternative))
      .filter((val) => !!val);

    return Either.right(
      LocalizedShardModel.from({
        alternatives,
        author: this.author,
        contentJSON: this.contentJSON,
        createdAt: this.createdAt,
        id: this.id,
        languageCode: this.languageCode,
        publishedAt: this.publishedAt,
        seo: this.seo,
        shortDescription: this.shortDescription,
        slug: this.slug,
        title: this.title,
        updatedAt: this.updatedAt,
      })
    );
  }
}
