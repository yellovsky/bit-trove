// global modules
import type { BlogPostSegment } from '@repo/api-models';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { BlogPostTimelineBlock } from './blog-post-timeline-block.component';
import { BlogPostTimelineBlockPending } from './blog-post-timeline-block.pending';

const getFakeItem = (): BlogPostSegment => {
  const created_at = faker.date.past().toISOString();

  return {
    created_at,
    id: faker.string.uuid(),
    language_code: faker.helpers.arrayElement(['ru', 'en']),
    language_codes: faker.helpers.arrayElement([['ru', 'en'], ['ru'], ['en']]),
    original_language_code: faker.helpers.arrayElement(['ru', 'en']),
    published_at: created_at,
    short_description: faker.lorem.paragraph(),
    slug: faker.lorem.word(),
    title: faker.lorem.sentence(),
  };
};

const meta = {
  component: BlogPostTimelineBlock,
  tags: ['autodocs'],
  title: 'Components/BlogPostTimelineBlock',

  args: {
    item: getFakeItem(),
    pending: false,
  },
  argTypes: {},
} satisfies Meta<typeof BlogPostTimelineBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Pending: Story = {
  render: () => <BlogPostTimelineBlockPending />,
};
