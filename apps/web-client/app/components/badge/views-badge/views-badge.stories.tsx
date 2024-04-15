// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { ViewsBadge } from './views-badge.component';

const meta = {
  component: ViewsBadge,
  title: 'Components/Badges/ViewsBadge',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    viewsCount: {
      control: 'number',
      description: 'Views count',
      table: { category: 'Component props', type: { summary: 'number' } },
      type: { name: 'number' },
    },
  },

  args: { viewsCount: faker.number.int({ max: 1_000_000, min: 1 }) },
} satisfies Meta<typeof ViewsBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
