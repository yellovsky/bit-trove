// global modules
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { AuthorBadge } from './author-badge.component';
import { generateFakeAuthorSegment } from '@bit-trove/api-models/author';

const fakeAuthor = generateFakeAuthorSegment();

const meta = {
  component: AuthorBadge,
  title: 'Components/Badges/AuthorBadge',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    author: {
      control: false,
      description: 'Author',
      table: { category: 'Component props', type: { summary: 'AuthorSegment' } },
      type: { name: 'other', value: 'AuthorSegment' },
    },
  },

  args: { author: fakeAuthor },
} satisfies Meta<typeof AuthorBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
