import type { MetaDescriptor } from 'react-router';
import type { Article, WithContext } from 'schema-dts';

import type { Shard } from '@repo/api-models';

import { getGlobal } from '@shared/lib/get-global';

import { getShardLink } from '@features/shards';

export const getShardOgMeta = (shard: Shard): MetaDescriptor[] => [
  { content: 'article', property: 'og:type' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getShardLink(shard)].join('/'), property: 'og:url' },
  { content: shard.title, property: 'og:title' },
  { content: shard.shortDescription, property: 'og:description' },
  { content: shard.languageCode, property: 'og:locale' },
  { content: 'BitTrove', property: 'og:site_name' },
];

export const getShardTwitterMeta = (shard: Shard): MetaDescriptor[] => [
  { content: 'summary', name: 'twitter:card' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getShardLink(shard)].join('/'), name: 'twitter:url' },
  { content: shard.title, name: 'twitter:title' },
  { content: shard.shortDescription, name: 'twitter:description' },
];

// TODO add author
export const getShardJsonJdMeta = (shard: Shard): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'Article',
    datePublished: shard.publishedAt ?? '',
    description: shard.shortDescription ?? '',
    headline: shard.title,
    inLanguage: shard.languageCode,
    mainEntityOfPage: {
      '@id': [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getShardLink(shard)].join('/'),
      '@type': 'WebPage',
    },
  } satisfies WithContext<Article>,
});
