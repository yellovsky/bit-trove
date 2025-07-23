import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';
import TextAreaMdx from './TextArea.mdx';

const meta = {
  args: {
    'aria-invalid': false,
    className: '',
    disabled: false,
    placeholder: 'Enter text',
    rows: 4,
    style: {},
    variant: 'surface',
  },
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the textarea is in an error state',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    palette: {
      control: 'select',
      description: 'Color palette for theming',
      options: ['default', 'brand', 'gray', 'red', 'teal', 'green', 'amber'],
      table: {
        category: 'Appearance',
        type: { summary: 'Palette' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline styles for the textarea',
      table: {
        category: 'Styling',
        type: { summary: 'React.CSSProperties' },
      },
    },
    variant: {
      control: 'select',
      description: 'Visual style variant of the textarea',
      options: ['soft', 'surface'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'surface' },
        type: { summary: 'soft | surface' },
      },
    },
  },
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="mx-auto w-lg ">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: TextAreaMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/TextArea',
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
