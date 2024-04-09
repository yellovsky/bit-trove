// global modules
import type { MetaDescriptor } from '@remix-run/node';
import { BlogPosting, Person, WithContext } from 'schema-dts';

// local modules
import { getAuthorName } from '../author';
import type { Thought } from './thought.standalone';
import type { ThoughtCore } from './thought.core';

export const thoughtLink = (thought: ThoughtCore): string => `/thoughts/${thought.slug}`;

const getThoughtJsonLd = (thought: Thought): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',

  author: {
    '@type': 'Person',
    name: getAuthorName(thought.author.data?.attributes),
  } satisfies Person,

  articleSection: thought.categories.data.map((category) => category.attributes.name),
  datePublished: thought.publishedAt,
  description: thought.seo?.description,
  headline: thought.title,
  inLanguage: thought.locale,
  keywords: thought.seo?.keywords,
  name: thought.seo?.title,
  url: thoughtLink(thought),
});

export const getThoughtMetadata = (thought: Thought): MetaDescriptor[] => {
  const authorName = getAuthorName(thought.author.data?.attributes);

  const metaTags: MetaDescriptor[] = [
    { content: authorName, name: 'author' },
    { content: thought.seo?.description, name: 'description' },
    { content: thought.seo?.keywords, name: 'keywords' },

    /** OG tags */
    { content: thought.seo?.title || thought.title, property: 'og:title' },
    { content: thought.seo?.description, property: 'og:description' },
    { content: thoughtLink(thought), property: 'og:url' },
    { content: 'article', property: 'og:type' },
    { content: thought.locale, property: 'og:locale' },
    { content: thought.publishedAt, property: 'article:published_time' },
    { content: thought.updatedAt, property: 'article:modified_time' },
    { content: authorName, property: 'article:author' },
  ].filter((metaDescriptor) => metaDescriptor.content);

  return [
    ...metaTags,
    { title: thought.seo?.title || thought.title },
    { 'script:ld+json': getThoughtJsonLd(thought) },
  ];
};
