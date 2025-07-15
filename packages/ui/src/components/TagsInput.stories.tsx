import type { Meta, StoryObj } from '@storybook/react';

import { type Option, TagsInput } from './TagsInput';

const OPTIONS: Option[] = [
  { label: 'Next.js', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Radix UI', value: 'radix' },
  { label: 'Shadcn/ui', value: 'shadcn' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Prisma', value: 'prisma' },
  { label: 'tRPC', value: 'trpc' },
  { label: 'Vite', value: 'vite' },
];

const meta = {
  args: {
    options: OPTIONS,
    placeholder: 'Select technologies...',
  },
  argTypes: {
    onChange: {
      action: 'changed',
      description: 'Callback when selected tags change',
    },
    options: {
      control: 'object',
      description: 'Available options to select from',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no tags are selected',
    },
    value: {
      control: 'object',
      description: 'Selected tags',
    },
  },
  component: TagsInput,
  parameters: {
    layout: 'centered',
  },
  title: 'UI/TagsInput',
} satisfies Meta<typeof TagsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreselectedTags: Story = {
  args: {
    value: [
      { label: 'Next.js', value: 'nextjs' },
      { label: 'TypeScript', value: 'typescript' },
    ],
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Add some tech tags...',
  },
};
