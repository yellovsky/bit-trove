import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import type { ShortShard } from '@repo/api-models';

import { ShardListCard } from './ShardCard';

const makeFakeShard = (): ShortShard => {
  return {
    alternatives: [],
    author: { id: 'id', name: faker.person.fullName() },
    createdAt: faker.date.past().toUTCString(),
    entryId: faker.string.uuid(),
    id: faker.string.uuid(),
    languageCode: 'en',
    publishedAt: faker.date.past().toUTCString(),
    readingTime: 1,
    shortDescription: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    tags: [
      { id: faker.string.uuid(), name: faker.lorem.word(), slug: faker.lorem.slug() },
      { id: faker.string.uuid(), name: faker.lorem.word(), slug: faker.lorem.slug() },
    ],
    title: faker.lorem.sentence(),
    type: 'shard',
  };
};

const meta = {
  args: {
    shard: makeFakeShard(),
  },
  component: ShardListCard,
  title: 'Components/ShardListCard',
} satisfies Meta<typeof ShardListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithoutAuthor: Story = {
  args: { shard: { ...makeFakeShard(), author: null } },
};

export const WithoutTags: Story = {
  args: { shard: { ...makeFakeShard(), tags: [] } },
};

export const WithLongDescription: Story = {
  args: { shard: { ...makeFakeShard(), shortDescription: faker.lorem.paragraph(10) } },
};

export const RedPalette: Story = {
  args: { shard: makeFakeShard() },
};
