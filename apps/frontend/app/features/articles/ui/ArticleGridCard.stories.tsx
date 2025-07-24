import type { Meta, StoryObj } from '@storybook/react';

import type { ShortArticle } from '@repo/api-models';

import { ArticleGridCard, ArticleGridCardPending } from './ArticleGridCard';

const mockArticle: ShortArticle = {
  alternatives: [],
  author: { id: 'author-1', name: 'Jane Doe' },
  createdAt: '2024-07-14T10:00:00.000Z',
  entryId: 'entry-1',
  id: '1',
  languageCode: 'en',
  publishedAt: '2024-07-14T10:00:00.000Z',
  readingTime: 5,
  shortDescription: 'A short description of the article.',
  slug: 'example-article',
  tags: [
    { id: 'tag-1', name: 'React', slug: 'react' },
    { id: 'tag-2', name: 'TypeScript', slug: 'typescript' },
  ],
  title: 'Example Article',
  type: 'blog_post',
};

const meta: Meta<typeof ArticleGridCard> = {
  component: ArticleGridCard,
  tags: ['autodocs'],
  title: 'Articles/ArticleGridCard',
};
export default meta;

type Story = StoryObj<typeof ArticleGridCard>;

export const Default: Story = {
  args: {
    article: mockArticle,
    to: '/articles/1',
  },
};

export const NoReadingTime: Story = {
  args: {
    article: { ...mockArticle, readingTime: 0 },
    to: '/articles/1',
  },
};

export const NoDescription: Story = {
  args: {
    article: { ...mockArticle, shortDescription: null },
    to: '/articles/1',
  },
};

export const Pending: Story = {
  render: () => <ArticleGridCardPending />,
};
