// global modules
import type { ComponentProps } from 'react';
import { Fragment } from 'react/jsx-runtime';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Button, type ButtonVariant } from './button.component';

const BUTTON_SIZES = ['lg', 'md', 'sm', 'xs'] as const;
const COLOR_SCHEMES = [
  'primary',
  'yellow',
  'gray',
  'red',
  'green',
  'orange',
  'black-alpha',
  'white-alpha',
] as const;

const meta = {
  component: Button,
  title: 'Button',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button text',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    colorScheme: {
      control: 'select',
      defaultValue: 'md',
      description: 'Button color scheme',
      options: COLOR_SCHEMES,
      table: {
        category: 'Component props',
        type: { summary: COLOR_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
      },
      type: { name: 'other', value: COLOR_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      description: 'Button size',
      options: BUTTON_SIZES,
      table: {
        category: 'Component props',
        type: { summary: BUTTON_SIZES.map((size) => `"${size}"`).join(' | ') },
      },
      type: { name: 'other', value: BUTTON_SIZES.map((size) => `"${size}"`).join(' | ') },
    },
    variant: {
      control: 'select',
      description: 'Button variant',
      options: ['filled', 'outline'],
      table: { category: 'Component props', type: { summary: "'filled' | 'outline'" } },
      type: { name: 'other', value: "'filled' | 'outline'" },
    },
  },

  args: { children: 'Button', colorScheme: 'primary', size: 'md', variant: 'filled' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

const renderButtonSet = (variant: ButtonVariant) => (props: ComponentProps<typeof Button>) => (
  <div
    style={{
      alignItems: 'center',
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: `repeat(${BUTTON_SIZES.length + 1}, min-content)`,
    }}
  >
    {COLOR_SCHEMES.map((colorScheme) => (
      <Fragment key={colorScheme}>
        <div style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{colorScheme}:</div>
        {BUTTON_SIZES.map((size) => (
          <Button {...props} colorScheme={colorScheme} key={size} size={size} variant={variant} />
        ))}
      </Fragment>
    ))}
  </div>
);

export const Filled: Story = { render: renderButtonSet('filled') };
export const Outline: Story = { render: renderButtonSet('outline') };
