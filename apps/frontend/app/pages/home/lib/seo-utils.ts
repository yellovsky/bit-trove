import type { MetaDescriptor } from 'react-router';
import type { WebSite, WithContext } from 'schema-dts';

import { getGlobal } from '@shared/lib/get-global';

/**
 * Generate Open Graph meta tags for home page
 */
export const getHomeOgMeta = (): MetaDescriptor[] => [
  { content: 'website', property: 'og:type' },
  { content: getGlobal('REMIX_PUBLIC_CLIENT_HOST'), property: 'og:url' },
  { content: 'BitTrove – Personal Programming Blog & Code Notes', property: 'og:title' },
  {
    content:
      'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
    property: 'og:description',
  },
  { content: 'BitTrove', property: 'og:site_name' },
  { content: 'en_US', property: 'og:locale' },
];

/**
 * Generate Twitter Card meta tags for home page
 */
export const getHomeTwitterMeta = (): MetaDescriptor[] => [
  { content: 'summary_large_image', name: 'twitter:card' },
  { content: getGlobal('REMIX_PUBLIC_CLIENT_HOST'), name: 'twitter:url' },
  { content: 'BitTrove – Personal Programming Blog & Code Notes', name: 'twitter:title' },
  {
    content:
      'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
    name: 'twitter:description',
  },
];

/**
 * Generate JSON-LD structured data for home page
 */
export const getHomeJsonLdMeta = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    description:
      'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
    name: 'BitTrove',
    publisher: {
      '@type': 'Organization',
      name: 'BitTrove',
      url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    },
    url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
  } satisfies WithContext<WebSite>,
});
