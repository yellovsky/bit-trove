// global modules
import type { MetaFunction } from '@remix-run/node';

// common modules
import { addHostnameToLink } from '~/utils/links';

export const makePageMetaTitle = (...title: Array<string | undefined>): string =>
  [...title].filter(Boolean).join(' | ');

export const getISODate = (date: string): string => new Date(date).toISOString().split('T')[0];

export interface SEOMetaParams {
  title: string;
  canonical: string;
  description: string | null;
  keywords: string | null;
  alternate: Array<{ hrefLang: string; href: string }>;
  jsonSchemas?: object[];
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

  return meta;
};
