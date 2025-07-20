import type { Meta, StoryObj } from '@storybook/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CaseSensitiveIcon,
  ChevronDownIcon,
  GridIcon,
  ItalicIcon,
  ListIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useState } from 'react';

import { PALETTES } from '../lib/palette';
import { Toggle, type ToggleProps } from './Toggle';

const meta = {
  args: {
    disabled: false,
    isActive: false,
    radius: 'default',
    size: 'md',
    variant: 'dimmed',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is in active state',
    },
    palette: {
      control: { type: 'select' },
      description: 'The color palette for the toggle',
      options: PALETTES,
    },
    radius: {
      control: { type: 'select' },
      description: 'The border radius of the toggle button',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full', 'default'],
    },
    size: {
      control: { type: 'select' },
      description: 'The size of the toggle button',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      description: 'The visual variant of the toggle',
      options: ['dimmed'],
    },
  },
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component:
          'A toggle component built with Radix UI primitives that supports various sizes, radius options, and color palettes.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Toggle',
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Toggle Component for Stories
const InteractiveToggle = (args: ToggleProps) => {
  const [isActive, setIsActive] = useState(args.isActive || false);

  return (
    <Toggle {...args} isActive={isActive} onPressedChange={setIsActive}>
      {args.children}
    </Toggle>
  );
};

// Basic Toggle with Icon
export const Default: Story = {
  args: {
    children: <BoldIcon />,
  },
  render: (args) => <InteractiveToggle {...args} />,
};

// Toggle with Text
export const WithText: Story = {
  args: {
    children: 'Toggle',
  },
  render: (args) => <InteractiveToggle {...args} />,
};

// Toggle with Icon and Text
export const WithIconAndText: Story = {
  args: {
    children: (
      <>
        <BoldIcon />
        Bold
      </>
    ),
  },
  render: (args) => <InteractiveToggle {...args} />,
};

// Size Variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle component in different sizes: small, medium, and large.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <InteractiveToggle size="sm">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle size="md">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle size="lg">
        <BoldIcon />
      </InteractiveToggle>
    </div>
  ),
};

// Radius Variants
export const RadiusVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle component with different border radius options.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <InteractiveToggle radius="none">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="xs">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="sm">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="md">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="lg">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="xl">
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle radius="full">
        <BoldIcon />
      </InteractiveToggle>
    </div>
  ),
};

// Color Palettes
export const ColorPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle component with different color palettes.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      {PALETTES.map((palette) => (
        <div className="text-center" key={palette}>
          <div className="mb-2 text-gray-500 text-xs capitalize">{palette}</div>
          <InteractiveToggle palette={palette}>
            <BoldIcon />
          </InteractiveToggle>
        </div>
      ))}
    </div>
  ),
};

// States
export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle component in different states: default, active, disabled, and disabled active.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <InteractiveToggle>
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle isActive>
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle disabled>
        <BoldIcon />
      </InteractiveToggle>
      <InteractiveToggle disabled isActive>
        <BoldIcon />
      </InteractiveToggle>
    </div>
  ),
};

// Text Formatting Example
export const TextFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of using toggles for text formatting controls.',
      },
    },
  },
  render: () => {
    const [formats, setFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
    });

    const toggleFormat = (format: keyof typeof formats) => {
      setFormats((prev) => ({ ...prev, [format]: !prev[format] }));
    };

    return (
      <div className="flex items-center gap-2">
        <Toggle isActive={formats.bold} onPressedChange={() => toggleFormat('bold')} size="sm">
          <BoldIcon />
        </Toggle>
        <Toggle isActive={formats.italic} onPressedChange={() => toggleFormat('italic')} size="sm">
          <ItalicIcon />
        </Toggle>
        <Toggle isActive={formats.underline} onPressedChange={() => toggleFormat('underline')} size="sm">
          <UnderlineIcon />
        </Toggle>
      </div>
    );
  },
};

// Alignment Controls Example
export const AlignmentControls: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of using toggles for alignment controls with mutually exclusive states.',
      },
    },
  },
  render: () => {
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

    return (
      <div className="flex items-center gap-2">
        <Toggle isActive={alignment === 'left'} onPressedChange={() => setAlignment('left')} size="sm">
          <AlignLeftIcon />
        </Toggle>
        <Toggle isActive={alignment === 'center'} onPressedChange={() => setAlignment('center')} size="sm">
          <AlignCenterIcon />
        </Toggle>
        <Toggle isActive={alignment === 'right'} onPressedChange={() => setAlignment('right')} size="sm">
          <AlignRightIcon />
        </Toggle>
      </div>
    );
  },
};

// View Mode Toggle Example
export const ViewModeToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of using toggles for view mode selection.',
      },
    },
  },
  render: () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    return (
      <div className="flex items-center gap-2">
        <Toggle isActive={viewMode === 'list'} onPressedChange={() => setViewMode('list')} size="sm">
          <ListIcon />
        </Toggle>
        <Toggle isActive={viewMode === 'grid'} onPressedChange={() => setViewMode('grid')} size="sm">
          <GridIcon />
        </Toggle>
      </div>
    );
  },
};

// Complex Content
export const ComplexContent: Story = {
  args: {
    children: (
      <>
        <CaseSensitiveIcon />
        <ChevronDownIcon />
        Case Sensitive
      </>
    ),
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle with multiple icons and text content.',
      },
    },
  },
  render: (args) => <InteractiveToggle {...args} />,
};

// All Variants Grid
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive view of all toggle variants, sizes, radius options, and color palettes.',
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-medium text-sm">Sizes</h3>
        <div className="flex items-center gap-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div className="text-center" key={size}>
              <div className="mb-2 text-gray-500 text-xs">{size}</div>
              <InteractiveToggle size={size}>
                <BoldIcon />
              </InteractiveToggle>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-medium text-sm">Radius Variants</h3>
        <div className="flex items-center gap-4">
          {(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
            <div className="text-center" key={radius}>
              <div className="mb-2 text-gray-500 text-xs">{radius}</div>
              <InteractiveToggle radius={radius}>
                <BoldIcon />
              </InteractiveToggle>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-medium text-sm">Color Palettes</h3>
        <div className="grid grid-cols-5 gap-4">
          {PALETTES.map((palette) => (
            <div className="text-center" key={palette}>
              <div className="mb-2 text-gray-500 text-xs capitalize">{palette}</div>
              <InteractiveToggle palette={palette}>
                <BoldIcon />
              </InteractiveToggle>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
