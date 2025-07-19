import type { Meta, StoryObj } from '@storybook/react';

import { ContentLanguageSelector } from './ContentLanguageSelector';

const meta: Meta<typeof ContentLanguageSelector> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Optional className for additional styling',
    },
  },
  component: ContentLanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Features/LanguageSwitcher/ContentLanguageSelector',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-gray-100 rounded-lg p-4',
  },
};
