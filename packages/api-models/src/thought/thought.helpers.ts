// global modules
import { BlogPosting, Person, WithContext } from 'schema-dts';

// local modules
import type { ThoughtCore } from './thought.core';
import type { Thought } from './thought.standalone';
import type { Metadata } from 'next';
import { getAuthorName } from '../author';

export const thoughtLink = (thought: ThoughtCore): string => `/thoughts/${thought.slug}`;

export const getThoughtMetadata = (thought: Thought): Metadata => {
  const authorName = getAuthorName(thought.author.data?.attributes);

  return {
    creator: authorName,
    authors: [{ name: authorName }],
    keywords: thought.seo?.keywords,
    description: thought.seo?.description,
    title: thought.seo?.title || thought.title,

    openGraph: {
      type: 'article',
      authors: authorName,
      locale: thought.locale,
      url: thoughtLink(thought),
      publishedTime: thought.publishedAt,
      description: thought.seo?.description,
      title: thought.seo?.title || thought.title,
      tags: thought.tags.data.map((tag) => tag.attributes.name),
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

  headline: thought.title,
  name: thought.seo?.title,
  url: thoughtLink(thought),
  inLanguage: thought.locale,
  keywords: thought.seo?.keywords,
  datePublished: thought.publishedAt,
  description: thought.seo?.description,
  articleSection: thought.categories.data.map((category) => category.attributes.name),
});
