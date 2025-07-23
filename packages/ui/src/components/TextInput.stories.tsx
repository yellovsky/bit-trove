import type { Meta, StoryObj } from '@storybook/react';
import { EyeClosedIcon, LockIcon } from 'lucide-react';

import { IconButton } from './IconButton';
import { TextInput, TextInputEndSection, TextInputStartSection } from './TextInput';

const meta = {
  args: {
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'surface'],
    },
  },
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/TextInput1',
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
