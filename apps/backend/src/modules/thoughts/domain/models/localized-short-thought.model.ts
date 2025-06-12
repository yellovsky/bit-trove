import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { AuthorModel } from 'src/shared/models/author.model';

import type { AlternativeThoughtModel } from './alternative-thought.model';

interface LocalizedShortThoughtModelData {
  id: string;
  slug: string;
  publishedAt: Date | null;
  title: string;
  languageCode: string;
  shortDescription: string | null;
  alternatives: AlternativeThoughtModel[];
  createdAt: Date;
  author: AuthorModel | null;
}

export class LocalizedShortThoughtModel {
  static from(data: LocalizedShortThoughtModelData) {
    return new LocalizedShortThoughtModel(
      data.id,
      data.slug,
      data.publishedAt,
      data.title,
      data.shortDescription,
      data.languageCode,
      data.alternatives,
      data.createdAt,
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
    public readonly alternatives: AlternativeThoughtModel[],
    public readonly createdAt: Date,
    public readonly author: AuthorModel | null
  ) {}

  filterPublished(): ResultOrExcluded<LocalizedShortThoughtModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());

    const alternatives = this.alternatives
      .map((alternative) => alternative.filterPublished())
      .map((alternative) => Either.getOrNull(alternative))
      .filter((val) => !!val);

    return Either.right(
      LocalizedShortThoughtModel.from({
        alternatives,
        author: this.author,
        createdAt: this.createdAt,
        id: this.id,
        languageCode: this.languageCode,
        publishedAt: this.publishedAt,
        shortDescription: this.shortDescription,
        slug: this.slug,
        title: this.title,
      })
    );
  }
}
