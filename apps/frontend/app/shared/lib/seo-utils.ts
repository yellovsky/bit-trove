import type { MetaDescriptor } from 'react-router';
import type { BlogPosting, CollectionPage, WithContext } from 'schema-dts';

import type { BlogPost } from '@repo/api-models';

import { getGlobal } from '@shared/lib/get-global';

import { getBlogPostLink, getBlogPostsLink } from '@features/blog-posts';

/**
 * Generate Open Graph meta tags for blog posts page
 */
export const getBlogPostsOgMeta = (): MetaDescriptor[] => [
  { content: 'website', property: 'og:type' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostsLink()].join('/'), property: 'og:url' },
  { content: 'Blog Posts – Comprehensive Programming Articles & Tutorials', property: 'og:title' },
  {
    content:
      'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
    property: 'og:description',
  },
  { content: 'BitTrove', property: 'og:site_name' },
];

/**
 * Generate Twitter Card meta tags for blog posts page
 */
export const getBlogPostsTwitterMeta = (): MetaDescriptor[] => [
  { content: 'summary_large_image', name: 'twitter:card' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostsLink()].join('/'), name: 'twitter:url' },
  { content: 'Blog Posts – Comprehensive Programming Articles & Tutorials', name: 'twitter:title' },
  {
    content:
      'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
    name: 'twitter:description',
  },
];

/**
 * Generate Open Graph meta tags for individual blog post
 */
export const getBlogPostOgMeta = (blogPost: BlogPost): MetaDescriptor[] => [
  { content: 'article', property: 'og:type' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostLink(blogPost)].join('/'), property: 'og:url' },
  { content: blogPost.seo?.title || blogPost.title, property: 'og:title' },
  { content: blogPost.seo?.description || blogPost.shortDescription, property: 'og:description' },
  { content: blogPost.languageCode, property: 'og:locale' },
  { content: 'BitTrove', property: 'og:site_name' },
  { content: blogPost.publishedAt ?? '', property: 'article:published_time' },
];

/**
 * Generate Twitter Card meta tags for individual blog post
 */
export const getBlogPostTwitterMeta = (blogPost: BlogPost): MetaDescriptor[] => [
  { content: 'summary_large_image', name: 'twitter:card' },
  { content: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostLink(blogPost)].join('/'), name: 'twitter:url' },
  { content: blogPost.seo?.title || blogPost.title, name: 'twitter:title' },
  { content: blogPost.seo?.description || blogPost.shortDescription, name: 'twitter:description' },
];

/**
 * Generate JSON-LD structured data for blog posts collection page
 */
export const getBlogPostsJsonLdMeta = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    description:
      'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Blog Posts Collection',
    },
    name: 'Blog Posts – Comprehensive Programming Articles & Tutorials',
    url: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostsLink()].join('/'),
  } satisfies WithContext<CollectionPage>,
});

/**
 * Generate JSON-LD structured data for individual blog post
 */
export const getBlogPostJsonLdMeta = (blogPost: BlogPost): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: {
      '@type': 'Person',
      name: 'BitTrove',
    },
    datePublished: blogPost.publishedAt ?? '',
    description: blogPost.seo?.description || blogPost.shortDescription || undefined,
    headline: blogPost.seo?.title || blogPost.title,
    inLanguage: blogPost.languageCode,
    mainEntityOfPage: {
      '@id': [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostLink(blogPost)].join('/'),
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BitTrove',
      url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    },
  } satisfies WithContext<BlogPosting>,
});
