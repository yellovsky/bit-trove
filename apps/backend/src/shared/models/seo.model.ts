import type { Seo } from '@repo/api-models';

interface SeoModelData {
  title: string | null;
  description: string | null;
  keywords: string | null;
}

export class SeoModel implements Seo {
  static from(data: SeoModelData) {
    return new SeoModel(data.title, data.description, data.keywords);
  }

  constructor(
    public readonly title: string | null,
    public readonly description: string | null,
    public readonly keywords: string | null
  ) {}
}
