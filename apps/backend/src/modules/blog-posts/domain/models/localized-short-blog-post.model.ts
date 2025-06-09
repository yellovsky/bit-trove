import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';

import type { AlternativeBlogPostModel } from './alternative-blog-post.model';

interface LocalizedShortBlogPostModelData {
  id: string;
  slug: string;
  publishedAt: Date | null;
  title: string;
  languageCode: string;
  shortDescription: string;
  alternatives: AlternativeBlogPostModel[];
}

export class LocalizedShortBlogPostModel {
  static from(data: LocalizedShortBlogPostModelData) {
    return new LocalizedShortBlogPostModel(
      data.id,
      data.slug,
      data.publishedAt,
      data.title,
      data.shortDescription,
      data.languageCode,
      data.alternatives
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly title: string,
    public readonly shortDescription: string,
    public readonly languageCode: string,
    public readonly alternatives: AlternativeBlogPostModel[]
  ) {}

  filterPublished(): ResultOrExcluded<LocalizedShortBlogPostModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());

    const alternatives = this.alternatives
      .map((alternative) => alternative.filterPublished())
      .map((alternative) => Either.getOrNull(alternative))
      .filter((val) => !!val);

    return Either.right(
      LocalizedShortBlogPostModel.from({
        alternatives,
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
