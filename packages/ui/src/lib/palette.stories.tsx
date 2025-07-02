import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';

import { getPaletteClassName, PALETTES } from './palette';

const ColorSwatch: FC<{ color: string }> = ({ color }) => (
  <div className="h-7 w-7 rounded-full border border-border" style={{ backgroundColor: color }} />
);

interface RowProps {
  title: string;
  color: string;
}

const Row: FC<RowProps> = ({ title, color }) => {
  return (
    <>
      <div style={{ whiteSpace: 'nowrap' }}>{title}</div>

      {PALETTES.map((palette) => {
        return (
          <div className={getPaletteClassName(palette)} key={palette}>
            <ColorSwatch color={color} />
          </div>
        );
      })}
    </>
  );
};

const render = () => (
  <div style={{ display: 'grid', gap: 16, gridTemplateColumns: `repeat(${PALETTES.length + 1} , min-content)` }}>
    <div />
    {PALETTES.map((palette) => (
      <div
        key={palette}
        style={{ textOrientation: 'mixed', textTransform: 'capitalize', width: 28, writingMode: 'sideways-lr' }}
      >
        {palette}
      </div>
    ))}

    <Row color="var(--color-primary-1)" title="color-1" />
    <Row color="var(--color-primary-2)" title="color-2" />
    <Row color="var(--color-primary-3)" title="color-3" />
    <Row color="var(--color-primary-4)" title="color-4" />
    <Row color="var(--color-primary-5)" title="color-5" />
    <Row color="var(--color-primary-6)" title="color-6" />
    <Row color="var(--color-primary-7)" title="color-7" />
    <Row color="var(--color-primary-8)" title="color-8" />
    <Row color="var(--color-primary-9)" title="color-9" />
    <Row color="var(--color-primary-10)" title="color-10" />
    <Row color="var(--color-primary-11)" title="color-11" />
    <Row color="var(--color-primary-12)" title="color-12" />

    <Row color="var(--color-primary-a1)" title="color-a1" />
    <Row color="var(--color-primary-a2)" title="color-a2" />
    <Row color="var(--color-primary-a3)" title="color-a3" />
    <Row color="var(--color-primary-a4)" title="color-a4" />
    <Row color="var(--color-primary-a5)" title="color-a5" />
    <Row color="var(--color-primary-a6)" title="color-a6" />
    <Row color="var(--color-primary-a7)" title="color-a7" />
    <Row color="var(--color-primary-a8)" title="color-a8" />
    <Row color="var(--color-primary-a9)" title="color-a9" />
    <Row color="var(--color-primary-a10)" title="color-a10" />
    <Row color="var(--color-primary-a11)" title="color-a11" />
    <Row color="var(--color-primary-a12)" title="color-a12" />

    <Row color="var(--color-primary-contrast)" title="color-contrast" />
    <Row color="var(--color-primary-surface)" title="color-surface" />
    <Row color="var(--color-primary-indicator)" title="color-indicator" />
    <Row color="var(--color-primary-track)" title="color-track" />
  </div>
);

const meta = {
  args: {
    tag: { id: 'id', name: 'Tag name', slug: 'tag-slug' },
  },
  render,
  title: 'UI/Palette',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const SemanticColors: Story = {
  render: () => (
    <div className="border border-border bg-background p-4">
      <div className="text-foreground">var(--color-text-foreground)</div>
      <div className="mt-4 border border-border bg-card p-4">
        <div className="text-card-foreground">var(--color-card-foreground)</div>
      </div>
      <div className="mt-4 border border-border bg-popover p-4">
        <div className="text-popover-foreground">var(--color-popover-foreground)</div>
      </div>
      <div className="mt-4 border border-border bg-secondary p-4">
        <div className="text-secondary-foreground">var(--color-secondary-foreground)</div>
      </div>
      <div className="mt-4 border border-border bg-accent p-4">
        <div className="text-accent-foreground">var(--color-accent-foreground)</div>
      </div>
      <div className="mt-4 border border-border bg-destructive p-4">
        <div className="text-destructive-foreground">var(--color-destructive-foreground)</div>
      </div>
      <div className="mt-4 border border-border bg-muted p-4">
        <div className="text-muted-foreground">var(--color-muted-foreground)</div>
      </div>
      <input
        className="inset-ring inset-ring-input-border mt-4 h-9 rounded-default bg-input-bg px-4 focus:inset-ring-2 focus:inset-ring-focus-ring"
        value="inputg"
      />
      <br />
      --chart-1: oklch(0.646 0.222 41.116); --chart-2: oklch(0.6 0.118 184.704); --chart-3: oklch(0.398 0.07 227.392);
      --chart-4: oklch(0.828 0.189 84.429); --chart-5: oklch(0.769 0.188 70.08);
      <br />
      {/* TODO: Add sidebar */}
      --sidebar: oklch(0.985 0 0); --sidebar-foreground: oklch(0.145 0 0); --sidebar-primary: oklch(0.205 0 0);
      --sidebar-primary-foreground: oklch(0.985 0 0); --sidebar-accent: oklch(0.97 0 0); --sidebar-accent-foreground:
      oklch(0.205 0 0); --sidebar-border: oklch(0.922 0 0); --sidebar-ring: oklch(0.708 0 0);
    </div>
  ),
};
