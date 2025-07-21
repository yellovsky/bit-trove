import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Switch } from './Switch';
import SwitchMdx from './Switch.mdx';

const meta = {
  args: {
    className: '',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Accessibility label',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
      table: {
        category: 'State',
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
      description: 'Whether the switch is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when checked state changes',
      table: {
        category: 'Events',
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
  component: Switch,
  parameters: {
    docs: {
      page: SwitchMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Switch',
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default switch (unchecked, enabled).
 */
export const Default: Story = {
  args: {},
};

/**
 * Checked switch (enabled).
 */
export const Checked: Story = {
  args: { checked: true },
};

/**
 * Disabled switch (unchecked).
 */
export const Disabled: Story = {
  args: { disabled: true },
};

/**
 * Checked and disabled switch.
 */
export const CheckedDisabled: Story = {
  args: { checked: true, disabled: true },
};

/**
 * Danger switch.
 */
export const Danger: Story = {
  args: { checked: true, palette: 'red' },
};

/**
 * Controlled switch using React state.
 */
export const Controlled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Controlled switch example using React state.',
      },
    },
  },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);
    return <Switch {...args} checked={isChecked} onCheckedChange={setIsChecked} />;
  },
};

/**
 * Switch with a label (for accessibility demonstration).
 */
export const WithLabel: Story = {
  args: { 'aria-label': undefined },
  parameters: {
    docs: {
      description: {
        story: 'Switch with an associated label for accessibility.',
      },
    },
  },
  render: (args) => (
    <label className="flex cursor-pointer items-center gap-2" htmlFor="switch-label-demo">
      <Switch {...args} id="switch-label-demo" />
      <span>Enable notifications</span>
    </label>
  ),
};
