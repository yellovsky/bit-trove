import type { Meta, StoryObj } from '@storybook/react';

import { LanguageSwitcherButton } from './LanguageSwitcherButton';

const meta: Meta<typeof LanguageSwitcherButton> = {
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Optional aria-label for accessibility',
    },
    className: {
      control: 'text',
      description: 'Optional className for additional styling',
    },
  },
  component: LanguageSwitcherButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Features/LanguageSwitcher/LanguageSwitcherButton',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomAriaLabel: Story = {
  args: {
    'aria-label': 'Switch language',
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'border-2 border-blue-500',
  },
};
