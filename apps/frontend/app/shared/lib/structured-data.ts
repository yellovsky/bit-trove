import type { MetaDescriptor } from 'react-router';
import type { BlogPosting, CollectionPage, Organization, Person, WithContext } from 'schema-dts';

import type { BlogPost } from '@repo/api-models';

import { getGlobal } from '@shared/lib/get-global';

import { getBlogPostLink, getBlogPostsLink } from '@features/blog-posts';

/**
 * Generate organization structured data for BitTrove
 */
export const getOrganizationJsonLd = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    logo: `${getGlobal('REMIX_PUBLIC_CLIENT_HOST')}/favicon.ico`,
    name: 'BitTrove',
    sameAs: [
      // Add social media URLs when available
    ],
    url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
  } satisfies WithContext<Organization>,
});

/**
 * Generate person structured data for BitTrove author
 */
export const getPersonJsonLd = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'BitTrove',
    url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    worksFor: {
      '@type': 'Organization',
      name: 'BitTrove',
    },
  } satisfies WithContext<Person>,
});

/**
 * Generate website structured data
 */
export const getWebsiteJsonLd = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    author: {
      '@type': 'Person',
      name: 'BitTrove',
    },
    description:
      'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
    name: 'BitTrove',
    publisher: {
      '@type': 'Organization',
      name: 'BitTrove',
    },
    url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
  },
});

/**
 * Generate breadcrumb structured data
 */
export const getBreadcrumbJsonLd = (breadcrumbs: Array<{ label: string; to: string }>): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      item: `${getGlobal('REMIX_PUBLIC_CLIENT_HOST')}${breadcrumb.to}`,
      name: breadcrumb.label,
      position: index + 1,
    })),
  },
});

/**
 * Generate blog post structured data with enhanced metadata
 */
export const getEnhancedBlogPostJsonLd = (blogPost: BlogPost): MetaDescriptor => ({
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
    keywords: blogPost.seo?.keywords || undefined,
    mainEntityOfPage: {
      '@id': [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostLink(blogPost)].join('/'),
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BitTrove',
      url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    },
    timeRequired: `PT${blogPost.readingTime}M`, // Estimate based on reading time
    wordCount: blogPost.readingTime * 200, // ISO 8601 duration format
  } satisfies WithContext<BlogPosting>,
});

/**
 * Generate blog posts collection structured data
 */
export const getEnhancedBlogPostsJsonLd = (): MetaDescriptor => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    description:
      'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
    mainEntity: {
      '@type': 'ItemList',
      description: 'A collection of programming articles, tutorials, and insights',
      name: 'Blog Posts Collection',
    },
    name: 'Blog Posts – Comprehensive Programming Articles & Tutorials',
    publisher: {
      '@type': 'Organization',
      name: 'BitTrove',
      url: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    },
    url: [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), getBlogPostsLink()].join('/'),
  } satisfies WithContext<CollectionPage>,
});
