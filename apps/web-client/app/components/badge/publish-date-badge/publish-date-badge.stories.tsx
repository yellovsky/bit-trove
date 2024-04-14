// global modules
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { PublishDateBadge } from './publish-date-badge.component';

const meta = {
  component: PublishDateBadge,
  title: 'Badges/PublishDateBadge',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    date: {
      control: 'date',
      description: 'Published on date',
      table: { category: 'Component props', type: { summary: 'number | string | Date' } },
      type: { name: 'other', value: 'number | string | Date' },
    },
  },

  args: { date: Date.now() },
} satisfies Meta<typeof PublishDateBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
