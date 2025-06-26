import type { Meta, StoryObj } from '@storybook/react';
import { Hash } from 'lucide-react';
import { Link } from 'react-router';

import { PALETTES } from '@repo/ui/lib/palette';

import { Badge, type BadgeProps } from './Badge';

const render = (args: BadgeProps) => (
  <>
    <div style={{ display: 'inline-grid', gap: '0.5rem', gridTemplateColumns: `repeat(${PALETTES.length}, 1fr)` }}>
      {PALETTES.map((palette) => (
        <div className="text-center capitalize" key={palette}>
          {palette}
        </div>
      ))}

      {PALETTES.map((palette) => (
        <div key={palette}>
          <Badge {...args} palette={palette}>
            {args.children}
          </Badge>
        </div>
      ))}
    </div>
  </>
);

const meta = {
  args: {
    children: 'Badge',
    radius: 'sm',
    round: false,
    size: 'md',
    variant: 'filled',
  },
  argTypes: {
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xs', 'full'],
    },
    round: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
  },
  component: Badge,
  render,
  title: 'UI/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Hash />
        Badge
      </>
    ),
  },
};

export const AsButton: Story = {
  args: {
    asChild: true,
    children: (
      <button type="button">
        <Hash />
        Badge
      </button>
    ),
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <Link to="#">
        <Hash />
        Badge
      </Link>
    ),
  },
};
