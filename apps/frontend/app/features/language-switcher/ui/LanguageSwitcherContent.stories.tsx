import type { Meta, StoryObj } from '@storybook/react';

import { LanguageSwitcherContent } from './LanguageSwitcherContent';

const meta: Meta<typeof LanguageSwitcherContent> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Optional className for additional styling',
    },
  },
  component: LanguageSwitcherContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Features/LanguageSwitcher/LanguageSwitcherContent',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-gray-100 rounded-lg',
  },
};
