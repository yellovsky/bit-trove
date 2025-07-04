import type { Meta, StoryObj } from '@storybook/react';
import { MailIcon, Newspaper, Send } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { Link } from 'react-router';

import { PALETTES } from '@repo/ui/lib/palette';

import { Button, type ButtonProps } from './Button';

const variants = ['default', 'destructive', 'dimmed', 'ghost', 'link', 'outline', 'secondary'] as const;

const render = (args: ButtonProps) => (
  <>
    <div style={{ display: 'inline-grid', gap: '0.5rem', gridTemplateColumns: `repeat(${PALETTES.length + 1}, 1fr)` }}>
      <div />
      {PALETTES.map((palette) => (
        <div className="text-center capitalize" key={palette}>
          {palette}
        </div>
      ))}

      {variants.map((variant) => (
        <Fragment key={variant}>
          <div>{variant}</div>
          {PALETTES.map((palette) => (
            <div key={`${variant}-${palette}`}>
              <Button {...args} palette={palette} variant={variant}>
                {args.children}
              </Button>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  </>
);

const meta = {
  args: {
    children: 'Button',
    radius: 'sm',
    size: 'default',
    variant: 'default',
  },
  argTypes: {
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xs', 'full'],
    },
    size: {
      control: 'select',
      options: ['icon', 'sm', 'default', 'lg'],
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
  args: {
    children: (
      <>
        <Newspaper strokeWidth={1.5} />
        Button
      </>
    ),
  },
};
export const WithRightElement: Story = {
  args: {
    children: (
      <>
        Send
        <Send strokeWidth={1.5} />
      </>
    ),
  },
};
export const WithLeftAndRightElement: Story = {
  args: {
    children: (
      <>
        <Newspaper strokeWidth={1.5} />
        Button
        <Send strokeWidth={1.5} />
      </>
    ),
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <Link to="#">Button as link</Link>,
  },
};

export const Icon: Story = {
  args: {
    children: <MailIcon />,
    size: 'icon',
  },
};
