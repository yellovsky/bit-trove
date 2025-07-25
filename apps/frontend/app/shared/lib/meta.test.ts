import type { MetaDescriptor } from 'react-router';
import { describe, expect, it } from 'vitest';

import { combineMetaKeywords, filterParentMeta, getAlternateMetaDescriptors, getMetaTitle } from './meta';

describe('getMetaTitle', () => {
  it('combines title and suffix with delimiter', () => {
    expect(getMetaTitle('Home', 'My Site')).toBe('Home | My Site');
    expect(getMetaTitle('About', 'My Site')).toBe('About | My Site');
  });

  it('handles empty title', () => {
    expect(getMetaTitle('', 'My Site')).toBe('My Site');
  });

  it('handles empty suffix', () => {
    expect(getMetaTitle('Home', '')).toBe('Home');
  });

  it('handles both empty', () => {
    expect(getMetaTitle('', '')).toBe('');
  });

  it('handles whitespace', () => {
    expect(getMetaTitle('  Home  ', '  My Site  ')).toBe('  Home   |   My Site  ');
  });
});

describe('combineMetaKeywords', () => {
  it('combines and deduplicates keywords', () => {
    expect(combineMetaKeywords('react, typescript', 'typescript, javascript')).toBe('react, typescript, javascript');
  });

  it('removes duplicates', () => {
    expect(combineMetaKeywords('react, typescript', 'typescript, react')).toBe('react, typescript');
  });

  it('trims whitespace', () => {
    expect(combineMetaKeywords(' react , typescript ', ' typescript , javascript ')).toBe(
      'react, typescript, javascript'
    );
  });

  it('handles empty keywords', () => {
    expect(combineMetaKeywords('', 'typescript')).toBe('typescript');
    expect(combineMetaKeywords('react', '')).toBe('react');
    expect(combineMetaKeywords('', '')).toBe('');
  });

  it('handles single keywords', () => {
    expect(combineMetaKeywords('react', 'typescript')).toBe('react, typescript');
  });
});

describe('filterParentMeta', () => {
  it('filters out title meta descriptors', () => {
    const descriptors: MetaDescriptor[] = [
      { title: 'Page Title' },
      { content: 'Page description', name: 'description' },
      { content: 'react, typescript', name: 'keywords' },
    ];

    const result = filterParentMeta(descriptors);
    expect(result).toEqual([{ content: 'Page description', name: 'description' }]);
  });

  it('filters out keywords meta descriptors', () => {
    const descriptors: MetaDescriptor[] = [
      { content: 'Page description', name: 'description' },
      { content: 'react, typescript', name: 'keywords' },
      { content: 'OG Title', property: 'og:title' },
    ];

    const result = filterParentMeta(descriptors);
    expect(result).toEqual([
      { content: 'Page description', name: 'description' },
      { content: 'OG Title', property: 'og:title' },
    ]);
  });

  it('filters out description meta descriptors', () => {
    const descriptors: MetaDescriptor[] = [
      { content: 'Page description', name: 'description' },
      { content: 'OG Title', property: 'og:title' },
      { content: 'width=device-width', name: 'viewport' },
    ];

    const result = filterParentMeta(descriptors);
    expect(result).toEqual([
      { content: 'OG Title', property: 'og:title' },
      { content: 'width=device-width', name: 'viewport' },
    ]);
  });

  it('returns empty array for empty input', () => {
    expect(filterParentMeta([])).toEqual([]);
  });

  it('keeps other meta descriptors', () => {
    const descriptors: MetaDescriptor[] = [
      { content: 'OG Title', property: 'og:title' },
      { content: 'OG Description', property: 'og:description' },
      { content: 'width=device-width', name: 'viewport' },
    ];

    const result = filterParentMeta(descriptors);
    expect(result).toEqual(descriptors);
  });
});

describe('getAlternateMetaDescriptors', () => {
  it('generates alternate meta descriptors for all supported locales except current', () => {
    const result = getAlternateMetaDescriptors('en', '/en/about');

    expect(result).toEqual([
      {
        href: '/ru/about',
        hreflang: 'ru',
        rel: 'alternate',
      },
    ]);
  });

  it('handles pathname with existing locale', () => {
    const result = getAlternateMetaDescriptors('ru', '/ru/contact');

    expect(result).toEqual([
      {
        href: '/en/contact',
        hreflang: 'en',
        rel: 'alternate',
      },
    ]);
  });

  it('handles pathname without locale', () => {
    const result = getAlternateMetaDescriptors('en', '/about');

    expect(result).toEqual([
      {
        href: '/ru/about',
        hreflang: 'ru',
        rel: 'alternate',
      },
    ]);
  });

  it('handles root pathname', () => {
    const result = getAlternateMetaDescriptors('en', '/');

    expect(result).toEqual([
      {
        href: '/ru/',
        hreflang: 'ru',
        rel: 'alternate',
      },
    ]);
  });

  it('handles pathname with trailing slash', () => {
    const result = getAlternateMetaDescriptors('en', '/about/');

    expect(result).toEqual([
      {
        href: '/ru/about/',
        hreflang: 'ru',
        rel: 'alternate',
      },
    ]);
  });
});
