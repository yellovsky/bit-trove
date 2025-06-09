import { Either } from 'effect';

import { NotPublishedReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { SeoModel } from 'src/shared/models/seo.model';

import type { AlternativeBlogPostModel } from './alternative-blog-post.model';

interface LocalizedBlogPostModelData {
  id: string;
  slug: string;
  publishedAt: Date | null;
  title: string;
  shortDescription: string;
  languageCode: string;
  seo: SeoModel;
  alternatives: AlternativeBlogPostModel[];
  contentJSON: object | null;
}

export class LocalizedBlogPostModel {
  static from(data: LocalizedBlogPostModelData) {
    return new LocalizedBlogPostModel(
      data.id,
      data.slug,
      data.publishedAt,
      data.title,
      data.shortDescription,
      data.languageCode,
      data.seo,
      data.alternatives,
      data.contentJSON
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly publishedAt: Date | null,
    public readonly title: string,
    public readonly shortDescription: string,
    public readonly languageCode: string,
    public readonly seo: SeoModel,
    public readonly alternatives: AlternativeBlogPostModel[],
    public readonly contentJSON: object | null
  ) {}

  filterPublished(): ResultOrExcluded<LocalizedBlogPostModel> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());

    const alternatives = this.alternatives
      .map((alternative) => alternative.filterPublished())
      .map((alternative) => Either.getOrNull(alternative))
      .filter((val) => !!val);

    return Either.right(
      LocalizedBlogPostModel.from({
        alternatives,
        contentJSON: this.contentJSON,
        id: this.id,
        languageCode: this.languageCode,
        publishedAt: this.publishedAt,
        seo: this.seo,
        shortDescription: this.shortDescription,
        slug: this.slug,
        title: this.title,
      })
    );
  }
}
