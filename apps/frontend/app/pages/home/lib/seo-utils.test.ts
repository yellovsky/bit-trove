import { describe, expect, it, vi } from 'vitest';

import { getHomeJsonLdMeta, getHomeOgMeta, getHomeTwitterMeta } from './seo-utils';

// Mock the global function
vi.mock('@shared/lib/get-global', () => ({
  getGlobal: vi.fn((key: string) => {
    if (key === 'REMIX_PUBLIC_CLIENT_HOST') return 'https://bittrove.com';
    return '';
  }),
}));

describe('Home Page SEO Utils', () => {
  describe('getHomeOgMeta', () => {
    it('returns correct Open Graph meta tags for home page', () => {
      const result = getHomeOgMeta();

      expect(result).toEqual([
        { content: 'website', property: 'og:type' },
        { content: 'https://bittrove.com', property: 'og:url' },
        { content: 'BitTrove – Personal Programming Blog & Code Notes', property: 'og:title' },
        {
          content:
            'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
          property: 'og:description',
        },
        { content: 'BitTrove', property: 'og:site_name' },
        { content: 'en_US', property: 'og:locale' },
      ]);
    });
  });

  describe('getHomeTwitterMeta', () => {
    it('returns correct Twitter Card meta tags for home page', () => {
      const result = getHomeTwitterMeta();

      expect(result).toEqual([
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: 'https://bittrove.com', name: 'twitter:url' },
        { content: 'BitTrove – Personal Programming Blog & Code Notes', name: 'twitter:title' },
        {
          content:
            'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
          name: 'twitter:description',
        },
      ]);
    });
  });

  describe('getHomeJsonLdMeta', () => {
    it('returns correct JSON-LD structured data for home page', () => {
      const result = getHomeJsonLdMeta();

      expect(result).toEqual({
        'script:ld+json': {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          description:
            'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
          name: 'BitTrove',
          publisher: {
            '@type': 'Organization',
            name: 'BitTrove',
            url: 'https://bittrove.com',
          },
          url: 'https://bittrove.com',
        },
      });
    });

    it('uses correct schema.org WebSite type', () => {
      const result = getHomeJsonLdMeta();
      const jsonLd = (result as any)['script:ld+json'];

      expect(jsonLd['@type']).toBe('WebSite');
      expect(jsonLd['@context']).toBe('https://schema.org');
    });

    it('includes proper publisher information', () => {
      const result = getHomeJsonLdMeta();
      const jsonLd = (result as any)['script:ld+json'];

      expect(jsonLd.publisher).toEqual({
        '@type': 'Organization',
        name: 'BitTrove',
        url: 'https://bittrove.com',
      });
    });
  });
});
