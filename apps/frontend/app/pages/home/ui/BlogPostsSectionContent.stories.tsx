import type { Meta, StoryObj } from '@storybook/react';

import type { ShortBlogPost } from '@repo/api-models';

import type { BlogPostsSectionViewProps } from './BlogPostsSection';
import { BlogPostsSectionView } from './BlogPostsSection';

const mockBlogPosts: ShortBlogPost[] = [
  {
    alternatives: [],
    author: { id: 'author-1', name: 'Jane Doe' },
    createdAt: '2024-07-14T10:00:00.000Z',
    entryId: 'entry-1',
    id: '1',
    languageCode: 'en',
    publishedAt: '2024-07-14T10:00:00.000Z',
    readingTime: 5,
    shortDescription: 'A deep dive into React Server Components.',
    slug: 'react-server-components',
    tags: [
      { id: 'tag-1', name: 'React', slug: 'react' },
      { id: 'tag-2', name: 'Server Components', slug: 'server-components' },
    ],
    title: 'React Server Components Explained',
    type: 'blog_post',
  },
  {
    alternatives: [],
    author: { id: 'author-2', name: 'John Smith' },
    createdAt: '2024-07-13T09:00:00.000Z',
    entryId: 'entry-2',
    id: '2',
    languageCode: 'en',
    publishedAt: '2024-07-13T09:00:00.000Z',
    readingTime: 3,
    shortDescription: 'Understanding TypeScript generics with real-world examples.',
    slug: 'typescript-generics',
    tags: [
      { id: 'tag-3', name: 'TypeScript', slug: 'typescript' },
      { id: 'tag-4', name: 'Generics', slug: 'generics' },
    ],
    title: 'Mastering TypeScript Generics',
    type: 'blog_post',
  },
];

const meta: Meta<typeof BlogPostsSectionView> = {
  component: BlogPostsSectionView,
  tags: ['autodocs'],
  title: 'Home/BlogPostsSectionContent',
};
export default meta;

type Story = StoryObj<typeof BlogPostsSectionView>;

export const Default: Story = {
  args: {
    blogPosts: mockBlogPosts,
    error: undefined,
    isError: false,
    isPending: false,
  } satisfies BlogPostsSectionViewProps,
};

export const Empty: Story = {
  args: {
    blogPosts: [],
    error: undefined,
    isError: false,
    isPending: false,
  } satisfies BlogPostsSectionViewProps,
};

export const Pending: Story = {
  args: {
    blogPosts: [],
    error: undefined,
    isError: false,
    isPending: true,
  } satisfies BlogPostsSectionViewProps,
};

export const ErrorState: Story = {
  args: {
    blogPosts: [],
    error: 'Something went wrong',
    isError: true,
    isPending: false,
  } satisfies BlogPostsSectionViewProps,
};
