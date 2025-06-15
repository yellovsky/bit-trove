import type { JSONContent } from '@repo/api-models';

import type { AuthorModel } from 'src/shared/models/author.model';
import type { SeoModel } from 'src/shared/models/seo.model';

import type { AlternativeShardModel } from './alternative-shard.model';

interface ShardModelData {
  id: string;
  slug: string;
  entryId: string;

  languageCode: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  shortDescription: string | null;
  contentJSON: JSONContent | null;

  seo: SeoModel | null;
  author: AuthorModel | null;
  alternatives: AlternativeShardModel[];
}

export class ShardModel {
  static from(data: ShardModelData) {
    return new ShardModel(
      data.id,
      data.slug,
      data.entryId,

      data.languageCode,
      data.publishedAt,
      data.createdAt,
      data.updatedAt,

      data.title,
      data.shortDescription,
      data.contentJSON,

      data.seo,
      data.author,
      data.alternatives
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly entryId: string,

    public readonly languageCode: string,
    public readonly publishedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,

    public readonly title: string,
    public readonly shortDescription: string | null,
    public readonly contentJSON: JSONContent | null,

    public readonly seo: SeoModel | null,
    public readonly author: AuthorModel | null,
    public readonly alternatives: AlternativeShardModel[]
  ) {}
}
