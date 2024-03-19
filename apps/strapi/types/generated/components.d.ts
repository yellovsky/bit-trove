import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksImageBlock extends Schema.Component {
  collectionName: 'components_blocks_image_blocks';
  info: {
    displayName: 'Image Block';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
  };
}

export interface BlocksRichTextBlock extends Schema.Component {
  collectionName: 'components_blocks_rich_text_blocks';
  info: {
    displayName: 'Rich Text Block';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.RichText;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
    icon: 'file';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    keywords: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.image-block': BlocksImageBlock;
      'blocks.rich-text-block': BlocksRichTextBlock;
      'seo.seo': SeoSeo;
    }
  }
}
