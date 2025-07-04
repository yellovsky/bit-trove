import type { Meta, StoryObj } from '@storybook/react';
import { MailIcon, Newspaper, Send } from 'lucide-react';
import { Link } from 'react-router';

import { PALETTES } from '@repo/ui/lib/palette';

import { Button } from './Button';
import ButtonMdx from './Button.mdx';

const variants = ['default', 'destructive', 'dimmed', 'ghost', 'link', 'outline', 'secondary'] as const;

const meta = {
  args: {
    children: 'Button',
    radius: 'sm',
    size: 'default',
    variant: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to display in the button',
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
    radius: {
      control: 'select',
      description: 'The border radius of the button',
      options: ['sm', 'md', 'lg', 'xl', 'xs', 'full'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'sm' },
        type: { summary: 'ButtonRadius' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the button',
      options: ['icon', 'sm', 'default', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonSize' },
      },
    },
    variant: {
      control: 'select',
      description: 'The visual style variant of the button',
      options: variants,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonVariant' },
      },
    },
  },
  component: Button,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with basic styling. This is the most common usage pattern.
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

/**
 * Button with destructive styling for dangerous actions.
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive variant for dangerous actions like delete or remove operations.',
      },
    },
  },
};

/**
 * Outline variant for secondary actions.
 */
export const Outline: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: "Outline variant for secondary actions that don't require primary emphasis.",
      },
    },
  },
};

/**
 * Ghost variant for subtle interactions.
 */
export const Ghost: Story = {
  args: {
    children: 'Settings',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: "Ghost variant for subtle interactions that don't need strong visual emphasis.",
      },
    },
  },
};

/**
 * Link variant for navigation-like interactions.
 */
export const LinkVariant: Story = {
  args: {
    children: 'Learn More',
    variant: 'link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link variant for navigation-like interactions that look like text links.',
      },
    },
  },
};

/**
 * Button with an icon on the left side.
 */
export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <Newspaper strokeWidth={1.5} />
        Read Article
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned on the left side for better visual hierarchy.',
      },
    },
  },
};

/**
 * Button with an icon on the right side.
 */
export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        Send
        <Send strokeWidth={1.5} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned on the right side, often used for actions like send or submit.',
      },
    },
  },
};

/**
 * Button with icons on both sides.
 */
export const WithLeftAndRightIcon: Story = {
  args: {
    children: (
      <>
        <Newspaper strokeWidth={1.5} />
        Share Article
        <Send strokeWidth={1.5} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icons on both sides for enhanced visual communication.',
      },
    },
  },
};

/**
 * Button rendered as a link for navigation.
 */
export const AsLink: Story = {
  args: {
    asChild: true,
    children: <Link to="#">Button as link</Link>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button rendered as a link element for navigation purposes. Maintains accessibility and keyboard navigation.',
      },
    },
  },
};

/**
 * Icon-only button for compact interfaces.
 */
export const IconOnly: Story = {
  args: {
    'aria-label': 'Mail',
    children: <MailIcon />,
    size: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button for compact interfaces where space is limited.',
      },
    },
  },
};

/**
 * Small button for compact layouts.
 */
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small button variant for compact layouts and secondary actions.',
      },
    },
  },
};

/**
 * Large button for prominent actions.
 */
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large button variant for prominent actions that need extra emphasis.',
      },
    },
  },
};

/**
 * Disabled button state.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button state for when the action is not available.',
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
        story: 'Demonstration of all available color palettes applied to the button component.',
      },
    },
  },
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {PALETTES.map((palette) => (
        <div className="flex flex-col items-center gap-2" key={palette}>
          <span className="font-medium text-xs capitalize">{palette}</span>
          <Button {...args} palette={palette}>
            {args.children}
          </Button>
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
    variant: 'default',
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
