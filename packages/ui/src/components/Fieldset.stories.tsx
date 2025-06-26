import type { Meta, StoryObj } from '@storybook/react';

import { Fieldset } from './Fieldset';

const meta: Meta<typeof Fieldset> = {
  args: {
    children: 'Content inside fieldset',
    legend: 'Legend label',
    radius: 'sm',
    variant: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
      table: { category: 'Content' },
    },
    className: {
      control: false,
    },
    legend: {
      control: 'text',
      table: { category: 'Content' },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      table: { category: 'Style' },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'unstyled'],
      table: { category: 'Style' },
    },
  },
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component: 'A fieldset is a container for a related group of form elements.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'UI/Fieldset',
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Primary: Story = {};
