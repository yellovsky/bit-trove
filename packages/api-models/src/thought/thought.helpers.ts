// global modules
import { BlogPosting, Person, WithContext } from 'schema-dts';

// local modules
import { getAuthorName } from '../author';
import type { Metadata } from 'next';
import type { Thought } from './thought.standalone';
import type { ThoughtCore } from './thought.core';

export const thoughtLink = (thought: ThoughtCore): string => `/thoughts/${thought.slug}`;

export const getThoughtMetadata = (thought: Thought): Metadata => {
  const authorName = getAuthorName(thought.author.data?.attributes);

  return {
    authors: [{ name: authorName }],
    creator: authorName,
    description: thought.seo?.description,
    keywords: thought.seo?.keywords,
    title: thought.seo?.title || thought.title,

    openGraph: {
      authors: authorName,
      description: thought.seo?.description,
      locale: thought.locale,
      publishedTime: thought.publishedAt,
      tags: thought.tags.data.map((tag) => tag.attributes.name),
      title: thought.seo?.title || thought.title,
      type: 'article',
      url: thoughtLink(thought),
    },
  };
};

export const getThoughtJsonLd = (thought: Thought): WithContext<BlogPosting> => ({
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
