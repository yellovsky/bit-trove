// global modules
import type { MetaFunction } from '@remix-run/node';

// common modules
import { addHostnameToLink } from '~/utils/links';

export const makePageMetaTitle = (...title: Array<string | undefined>): string =>
  [...title].filter(Boolean).join(' | ');

export const getISODate = (date: string): string => new Date(date).toISOString().split('T')[0];

export interface OGMeta {
  locale: string;
  type: string;
  title: string;
  description: string;
  url: string;
  published_time: string;
  image?: string;
  'image:width'?: string;
  'image:height'?: string;
  'image:type'?: string;

  // <meta property="og:site_name" content="Blank Slate" />
}

export interface TwitterMeta {
  card: 'summary' | 'summary_large_image';
  description: string;
  title: string;
  site?: string;
  image?: string;
  creator?: string;
}

export interface SEOMetaParams {
  title: string;
  canonical: string;
  description: string | null;
  keywords: string | null;
  alternate: Array<{ hrefLang: string; href: string }>;
  jsonSchemas: object[] | null;
  og: OGMeta | null;
  twitter: TwitterMeta | null;
}

export const makeSeoMeta = (params: SEOMetaParams): ReturnType<MetaFunction> => {
  const meta: ReturnType<MetaFunction> = [
    { title: params.title },
    { href: addHostnameToLink(params.canonical), rel: 'canonical', tagName: 'link' },
  ];

  if (params.description) meta.push({ content: params.description, name: 'description' });
  if (params.keywords) meta.push({ content: params.keywords, name: 'keywords' });

  if (params.alternate.length) {
    meta.push(
      ...params.alternate.map(alt => ({
        href: addHostnameToLink(alt.href),
        hrefLang: alt.hrefLang,
        rel: 'alternate',
        tagname: 'link',
      })),
    );
  }

  if (params.jsonSchemas?.length) {
    meta.push(...params.jsonSchemas?.map(jsonSchema => ({ 'script:ld+json': jsonSchema })));
  }

  if (params.og) {
    meta.push(...Object.entries(params.og).map(([key, content]) => ({ [`og:${key}`]: content })));
  }

  if (params.twitter) {
    meta.push(
      ...Object.entries(params.twitter).map(([key, content]) => ({ [`twitter:${key}`]: content })),
    );
  }

  return meta;
};
