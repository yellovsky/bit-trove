import { ApiProperty } from '@nestjs/swagger';

import type { Seo } from '@repo/api-models';

import type { SeoModel } from '../models/seo.model';

export class SeoDto implements Seo {
  @ApiProperty({ example: 'Seo description', nullable: true, type: String })
  description: Seo['description'];

  @ApiProperty({ example: 'Seo keywords', nullable: true, type: String })
  keywords: Seo['keywords'];

  @ApiProperty({ example: 'Seo title', nullable: true, type: String })
  title: Seo['title'];

  static from(seoData: Seo): SeoDto {
    return new SeoDto(seoData.title, seoData.description, seoData.keywords);
  }

  static fromModel(model: SeoModel): SeoDto {
    return new SeoDto(model.title, model.description, model.keywords);
  }

  constructor(title: string | null, description: string | null, keywords: string | null) {
    this.title = title;
    this.description = description;
    this.keywords = keywords;
  }
}
