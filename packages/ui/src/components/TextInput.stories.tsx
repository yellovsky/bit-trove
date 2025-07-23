import type { Meta, StoryObj } from '@storybook/react';
import { EyeClosedIcon, LockIcon } from 'lucide-react';

import { IconButton } from './IconButton';
import { TextInput, TextInputEndSection, TextInputStartSection } from './TextInput';
import TextInputMdx from './TextInput.mdx';

const meta = {
  args: {
    className: '',
    placeholder: 'Enter text',
    variant: 'surface',
  },
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the input is in an error state',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: false,
      description: 'Sections (start/end) or icons to render inside the input',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
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
      description: 'Whether the input is disabled',
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
      description: 'Placeholder text for the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      description: 'Visual style variant of the input',
      options: ['soft', 'surface'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'surface' },
        type: { summary: 'soft | surface' },
      },
    },
  },
  component: TextInput,
  parameters: {
    docs: {
      page: TextInputMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/TextInput',
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStartSection: Story = {
  args: {
    children: (
      <TextInputStartSection>
        <LockIcon />
      </TextInputStartSection>
    ),
  },
};

export const WithEndSection: Story = {
  args: {
    children: (
      <TextInputEndSection>
        <EyeClosedIcon />
      </TextInputEndSection>
    ),
  },
};

export const WithStartAndEndSection: Story = {
  args: {
    children: (
      <>
        <TextInputStartSection>
          <LockIcon />
        </TextInputStartSection>
        <TextInputEndSection>
          <IconButton size="sm" variant="ghost">
            <EyeClosedIcon />
          </IconButton>
        </TextInputEndSection>
      </>
    ),
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    children: (
      <>
        <TextInputStartSection>
          <LockIcon />
        </TextInputStartSection>
        <TextInputEndSection>
          <IconButton size="sm" variant="ghost">
            <EyeClosedIcon />
          </IconButton>
        </TextInputEndSection>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <>
        <TextInputStartSection>
          <LockIcon />
        </TextInputStartSection>
        <TextInputEndSection>
          <IconButton size="sm" variant="ghost">
            <EyeClosedIcon />
          </IconButton>
        </TextInputEndSection>
      </>
    ),
    disabled: true,
  },
};
