import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';
import checkboxMd from './Checkbox.mdx';

const meta: Meta<typeof Checkbox> = {
  args: {
    'aria-invalid': false,
    checked: false,
    disabled: false,
    variant: 'surface',
  },
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['surface', 'soft'],
    },
  },
  component: Checkbox,
  parameters: {
    docs: {
      page: checkboxMd,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Checkbox',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Accept terms and conditions',
  },
};

export const WithDescription: Story = {
  args: {
    checked: false,
    description: 'Receive updates about new features and releases.',
    label: 'Subscribe to newsletter',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled checkbox',
  },
};
