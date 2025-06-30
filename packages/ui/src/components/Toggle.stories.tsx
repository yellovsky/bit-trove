import type { Meta, StoryObj } from '@storybook/react';
import { BoldIcon, CaseSensitiveIcon, ChevronDownIcon } from 'lucide-react';

import { PALETTES } from '../lib/palette';
import { Toggle, type ToggleProps } from './Toggle';

const variants = ['dimmed'] as const;

const render = (args: ToggleProps) => (
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
            <Toggle {...args} palette={palette} variant={variant}>
              {args.children}
            </Toggle>
          </div>
        ))
      )}
    </div>
  </>
);

const meta = {
  args: {
    children: <BoldIcon />,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  component: Toggle,
  render,
  title: 'UI/Toggle',
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithTwoIcons: Story = {
  args: {
    children: (
      <>
        <CaseSensitiveIcon className="size-6" />
        <ChevronDownIcon className="size-6" />
      </>
    ),
  },
};
