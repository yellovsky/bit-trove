import type { Meta, StoryObj } from '@storybook/react';
import { Hash, Tag, User } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@repo/ui/components/Badge';
import BadgeMdx from '@repo/ui/components/Badge.mdx';
import { PALETTES } from '@repo/ui/lib/palette';

const meta = {
  args: {
    children: 'Badge',
    variant: 'solid',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to display in the badge',
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
    palette: {
      control: 'select',
      description: 'Color palette for theming',
      options: ['default', ...PALETTES],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
        type: { summary: 'Palette' },
      },
    },
    variant: {
      control: 'select',
      description: 'The visual style variant of the badge',
      options: ['outline', 'soft', 'solid', 'surface'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
        type: { summary: 'BadgeVariant' },
      },
    },
  },
  component: Badge,
  parameters: {
    docs: {
      page: BadgeMdx,
    },
  },
  tags: ['autodocs'],
  title: 'UI/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge with basic styling. This is the most common usage pattern.
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
  },
};

/**
 * Outline variant for subtle emphasis without strong background colors.
 */
export const Outline: Story = {
  args: {
    children: 'Draft',
    variant: 'outline',
  },
};

/**
 * Secondary variant for less prominent badges.
 */
export const Soft: Story = {
  args: {
    children: 'Info',
    variant: 'soft',
  },
};

/**
 * Badge with an icon for better visual communication.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Tag className="size-3" />
        Category
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with an icon to provide additional visual context. Icons are automatically sized and spaced.',
      },
    },
  },
};

/**
 * Badge rendered as a button for interactive functionality.
 */
export const AsButton: Story = {
  args: {
    asChild: true,
    children: (
      <button type="button">
        <Hash className="size-3" />
        Interactive Badge
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge rendered as a button element for interactive functionality. Use `asChild` prop to render as any element.',
      },
    },
  },
};

/**
 * Badge rendered as a link for navigation.
 */
export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <Link to="#">
        <User className="size-3" />
        View Profile
      </Link>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge rendered as a link for navigation purposes. Maintains accessibility and keyboard navigation.',
      },
    },
  },
};

/**
 * Showcase of all palette variations for the default variant.
 */
export const PaletteVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all available color palettes applied to the badge component.',
      },
    },
  },
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {PALETTES.map((palette) => (
        <div className="flex flex-col items-center gap-2" key={palette}>
          <span className="font-medium text-xs capitalize">{palette}</span>
          <Badge {...args} palette={palette}>
            {args.children}
          </Badge>
        </div>
      ))}
    </div>
  ),
};

/**
 * Interactive test story for accessibility and functionality testing.
 */
export const InteractiveTest: Story = {
  args: {
    children: 'Click me',
    variant: 'solid',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: true,
            id: 'color-contrast',
          },
        ],
      },
    },
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        story:
          'Interactive test story for accessibility and functionality testing. Use Storybook interactions to test keyboard navigation and focus states.',
      },
    },
  },
};
