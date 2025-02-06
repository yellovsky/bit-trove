// global modules
import type { MetaFunction } from '@remix-run/node';

// common modules
import { addHostnameToLink } from '~/utils/links';

export const makePageMetaTitle = (...title: Array<string | undefined>): string =>
  [...title].filter(Boolean).join(' | ');

export interface SEOMetaParams {
  title: string;
  canonical: string;
  description: string | null;
  keywords: string | null;
  alternate: Array<{ hreflang: string; href: string }>;
}

export const makeSeoMeta = (params: SEOMetaParams): ReturnType<MetaFunction> => {
  const meta: ReturnType<MetaFunction> = [
    { title: params.title },
    { href: addHostnameToLink(params.canonical), rel: 'canonical', tagName: 'link' },
    ...params.alternate.map(alt => ({
      href: addHostnameToLink(alt.href),
      hreflang: alt.hreflang,
      rel: 'alternate',
      tagname: 'link',
    })),
  ];

  if (params.description) meta.push({ content: params.description, name: 'description' });
  if (params.keywords) meta.push({ content: params.keywords, name: 'keywords' });

  return meta;
};
