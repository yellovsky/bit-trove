import { describe, expect, it } from 'vitest';

import type { BlogPost } from '@repo/api-models';

import {
  getBlogPostJsonLdMeta,
  getBlogPostOgMeta,
  getBlogPostsJsonLdMeta,
  getBlogPostsOgMeta,
  getBlogPostsTwitterMeta,
  getBlogPostTwitterMeta,
} from './seo-utils';

const mockBlogPost: BlogPost = {
  alternatives: [],
  author: { id: 'author-1', name: 'John Doe' },
  contentJSON: null,
  createdAt: '2024-01-01T00:00:00Z',
  entryId: 'test-entry',
  id: 'test-id',
  languageCode: 'en',
  publishedAt: '2024-01-01T00:00:00Z',
  readingTime: 5,
  seo: {
    description: 'Test SEO description',
    keywords: 'test, seo, keywords',
    title: 'Test SEO Title',
  },
  shortDescription: 'Test short description',
  slug: 'test-blog-post',
  tags: [],
  title: 'Test Blog Post',
};

describe('Blog Posts SEO Utils', () => {
  describe('getBlogPostsOgMeta', () => {
    it('returns correct Open Graph meta tags for blog posts page', () => {
      const result = getBlogPostsOgMeta();

      expect(result).toEqual([
        { content: 'website', property: 'og:type' },
        { content: 'https://bittrove.com/blog', property: 'og:url' },
        { content: 'Blog Posts – Comprehensive Programming Articles & Tutorials', property: 'og:title' },
        {
          content:
            'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
          property: 'og:description',
        },
        { content: 'BitTrove', property: 'og:site_name' },
      ]);
    });
  });

  describe('getBlogPostsTwitterMeta', () => {
    it('returns correct Twitter Card meta tags for blog posts page', () => {
      const result = getBlogPostsTwitterMeta();

      expect(result).toEqual([
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: 'https://bittrove.com/blog', name: 'twitter:url' },
        { content: 'Blog Posts – Comprehensive Programming Articles & Tutorials', name: 'twitter:title' },
        {
          content:
            'Explore comprehensive articles, tutorials, and insights on programming, development, and technology. In-depth content on React, TypeScript, architecture, and more.',
          name: 'twitter:description',
        },
      ]);
    });
  });

  describe('getBlogPostOgMeta', () => {
    it('returns correct Open Graph meta tags for individual blog post', () => {
      const result = getBlogPostOgMeta(mockBlogPost);

      expect(result).toEqual([
        { content: 'article', property: 'og:type' },
        { content: 'https://bittrove.com/blog/test-blog-post', property: 'og:url' },
        { content: 'Test SEO Title', property: 'og:title' },
        { content: 'Test SEO description', property: 'og:description' },
        { content: 'en', property: 'og:locale' },
        { content: 'BitTrove', property: 'og:site_name' },
        { content: '2024-01-01T00:00:00Z', property: 'article:published_time' },
      ]);
    });

    it('falls back to blog post title when SEO title is not available', () => {
      const blogPostWithoutSeo = {
        ...mockBlogPost,
        seo: { description: null, keywords: null, title: null },
      };
      const result = getBlogPostOgMeta(blogPostWithoutSeo);

      expect(result).toEqual([
        { content: 'article', property: 'og:type' },
        { content: 'https://bittrove.com/blog/test-blog-post', property: 'og:url' },
        { content: 'Test Blog Post', property: 'og:title' },
        { content: 'Test short description', property: 'og:description' },
        { content: 'en', property: 'og:locale' },
        { content: 'BitTrove', property: 'og:site_name' },
        { content: '2024-01-01T00:00:00Z', property: 'article:published_time' },
      ]);
    });
  });

  describe('getBlogPostTwitterMeta', () => {
    it('returns correct Twitter Card meta tags for individual blog post', () => {
      const result = getBlogPostTwitterMeta(mockBlogPost);

      expect(result).toEqual([
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: 'https://bittrove.com/blog/test-blog-post', name: 'twitter:url' },
        { content: 'Test SEO Title', name: 'twitter:title' },
        { content: 'Test SEO description', name: 'twitter:description' },
      ]);
    });

    it('falls back to blog post title when SEO title is not available', () => {
      const blogPostWithoutSeo = { ...mockBlogPost, seo: { description: null, keywords: null, title: null } };
      const result = getBlogPostTwitterMeta(blogPostWithoutSeo);

      expect(result).toEqual([
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: 'https://bittrove.com/blog/test-blog-post', name: 'twitter:url' },
        { content: 'Test Blog Post', name: 'twitter:title' },
        { content: 'Test short description', name: 'twitter:description' },
      ]);
    });
  });

  describe('getBlogPostsJsonLdMeta', () => {
    it('returns correct JSON-LD structured data for blog posts collection page', () => {
      const result = getBlogPostsJsonLdMeta();

      expect(result).toEqual({
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
          url: 'https://bittrove.com/blog',
        },
      });
    });
  });

  describe('getBlogPostJsonLdMeta', () => {
    it('returns correct JSON-LD structured data for individual blog post', () => {
      const result = getBlogPostJsonLdMeta(mockBlogPost);

      expect(result).toEqual({
        'script:ld+json': {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          author: {
            '@type': 'Person',
            name: 'BitTrove',
          },
          datePublished: '2024-01-01T00:00:00Z',
          description: 'Test SEO description',
          headline: 'Test SEO Title',
          inLanguage: 'en',
          mainEntityOfPage: {
            '@id': 'https://bittrove.com/blog/test-blog-post',
            '@type': 'WebPage',
          },
          publisher: {
            '@type': 'Organization',
            name: 'BitTrove',
            url: 'https://bittrove.com/blog/test-blog-post',
          },
        },
      });
    });

    it('falls back to blog post title when SEO title is not available', () => {
      const blogPostWithoutSeo = { ...mockBlogPost, seo: { description: null, keywords: null, title: null } };
      const result = getBlogPostJsonLdMeta(blogPostWithoutSeo);

      const resulted = 'script:ld+json' in result ? result['script:ld+json'] : result;
      expect(resulted).toMatchObject({
        description: 'Test short description',
        headline: 'Test Blog Post',
      });
    });

    it('handles blog post without published date', () => {
      const blogPostWithoutDate = { ...mockBlogPost, publishedAt: null };
      const result = getBlogPostJsonLdMeta(blogPostWithoutDate);

      const resulted = 'script:ld+json' in result ? result['script:ld+json'] : result;
      expect(resulted).toMatchObject({
        datePublished: '',
      });
    });
  });
});
