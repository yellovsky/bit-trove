import type { Meta, StoryObj } from '@storybook/react';

import type { ShortShard } from '@repo/api-models';

import type { ShardsSectionViewProps } from './ShardsSection';
import { ShardsSectionView } from './ShardsSection';

const mockShards: ShortShard[] = [
  {
    alternatives: [],
    author: { id: 'author-1', name: 'Jane Doe' },
    createdAt: '2024-07-14T10:00:00.000Z',
    entryId: 'entry-1',
    id: '1',
    languageCode: 'en',
    publishedAt: '2024-07-14T10:00:00.000Z',
    readingTime: 2,
    shortDescription: 'A quick tip on using CSS grid for responsive layouts.',
    slug: 'responsive-css-grid',
    tags: [
      { id: 'tag-1', name: 'CSS', slug: 'css' },
      { id: 'tag-2', name: 'Grid', slug: 'grid' },
    ],
    title: 'Responsive CSS Grid',
    type: 'shard',
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
    shortDescription: 'Best practices for useEffect in React.',
    slug: 'using-useeffect-properly',
    tags: [
      { id: 'tag-3', name: 'React', slug: 'react' },
      { id: 'tag-4', name: 'Hooks', slug: 'hooks' },
    ],
    title: 'Using useEffect Properly',
    type: 'shard',
  },
];

const meta: Meta<typeof ShardsSectionView> = {
  component: ShardsSectionView,
  tags: ['autodocs'],
  title: 'Home/ShardsSectionContent',
};
export default meta;

type Story = StoryObj<typeof ShardsSectionView>;

export const Default: Story = {
  args: {
    error: undefined,
    isError: false,
    isPending: false,
    shards: mockShards,
  } satisfies ShardsSectionViewProps,
};

export const Empty: Story = {
  args: {
    error: undefined,
    isError: false,
    isPending: false,
    shards: [],
  } satisfies ShardsSectionViewProps,
};

export const Pending: Story = {
  args: {
    error: undefined,
    isError: false,
    isPending: true,
    shards: [],
  } satisfies ShardsSectionViewProps,
};

export const ErrorState: Story = {
  args: {
    error: 'Something went wrong',
    isError: true,
    isPending: false,
    shards: [],
  } satisfies ShardsSectionViewProps,
};
