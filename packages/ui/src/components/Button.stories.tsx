import type { Meta, StoryObj } from '@storybook/react';
import { Newspaper, Send } from 'lucide-react';
import { Link } from 'react-router';

import { PALETTES } from '@repo/ui/lib/palette';

import { Button, type ButtonProps } from './Button';

const variants = ['filled', 'secondary', 'outline', 'subtle', 'dimmed'] as const;

const render = (args: ButtonProps) => (
  <>
    <div style={{ display: 'inline-grid', gap: '0.5rem', gridTemplateColumns: `repeat(${PALETTES.length}, 1fr)` }}>
      {PALETTES.map((palette) => (
        <div className="text-center capitalize" key={palette}>
          {palette}
        </div>
      ))}

      {variants.map((variant) =>
        PALETTES.map((palette) => (
          <div key={`${variant}-${palette}`}>
            <Button {...args} palette={palette} variant={variant}>
              {args.children}
            </Button>
          </div>
        ))
      )}
    </div>
  </>
);

const meta = {
  args: {
    children: 'Button',
    radius: 'sm',
    size: 'md',
    variant: 'filled',
  },
  argTypes: {
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xs', 'full'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: variants,
    },
  },
  component: Button,
  render,
  title: 'UI/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithLeftElement: Story = {
  args: { leftElement: <Newspaper /> },
};
export const WithRightElement: Story = {
  args: { rightElement: <Send /> },
};
export const WithLeftAndRightElement: Story = {
  args: { leftElement: <Newspaper />, rightElement: <Send /> },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <Link to="#">Button as link</Link>,
  },
};
