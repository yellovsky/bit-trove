// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { TagBadge, TagBadgePending } from './tag-badge.component';

const meta = {
  component: TagBadge,
  title: 'Components/Badges/TagBadge',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    name: {
      control: 'text',
      description: 'Tag name',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'other', value: 'string' },
    },
    to: {
      control: false,
      description: 'Tag link',
      table: { category: 'Component props', type: { summary: 'To' } },
      type: { name: 'other', value: 'To' },
    },
  },

  args: { name: faker.lorem.word(), to: '#' },
} satisfies Meta<typeof TagBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Pending: Story = { render: () => <TagBadgePending /> };
