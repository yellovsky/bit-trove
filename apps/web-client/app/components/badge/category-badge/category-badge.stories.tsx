// global modules
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { CategoryBadge } from './category-badge.component';
import { generateFakeCatgorySegmentResponseData } from '@bit-trove/api-models/category';

const fakeCategory = generateFakeCatgorySegmentResponseData().attributes;

const meta = {
  component: CategoryBadge,
  title: 'Components/Badges/CategoryBadge',

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

  args: { category: fakeCategory },
} satisfies Meta<typeof CategoryBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
