import type { Schema, Attribute } from '@strapi/strapi';

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
      'seo.seo': SeoSeo;
    }
  }
}
