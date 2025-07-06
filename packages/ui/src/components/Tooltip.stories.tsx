import type { Meta, StoryObj } from '@storybook/react';
import { Info, Mail, Settings, User } from 'lucide-react';

import { Button } from '@repo/ui/components/Button';

import { Tooltip, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipTrigger } from './Tooltip';
import TooltipMdx from './Tooltip.mdx';

const sides = ['top', 'bottom', 'left', 'right'] as const;

const meta = {
  args: {
    children: 'Tooltip content',
    delayDuration: 0,
    side: 'top',
    sideOffset: 0,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to display in the tooltip',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the tooltip content',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    delayDuration: {
      control: 'number',
      description: 'Duration from when the mouse enters the trigger until the tooltip opens',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    side: {
      control: 'select',
      description: 'The preferred side of the trigger to render against',
      options: sides,
      table: {
        category: 'Positioning',
        defaultValue: { summary: 'top' },
        type: { summary: 'Side' },
      },
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger',
      table: {
        category: 'Positioning',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    docs: {
      page: TooltipMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Tooltip',
} satisfies Meta<TooltipContentProps & TooltipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic tooltip with default positioning and styling.
 */
export const Default: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip positioned on the top of the trigger element.
 */
export const Top: Story = {
  args: {
    side: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned above the trigger element.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Top tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip positioned on the bottom of the trigger element.
 */
export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned below the trigger element.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Bottom tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip positioned on the left of the trigger element.
 */
export const Left: Story = {
  args: {
    side: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the left of the trigger element.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Left tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip positioned on the right of the trigger element.
 */
export const Right: Story = {
  args: {
    side: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the right of the trigger element.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Right tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with custom offset from the trigger element.
 */
export const WithOffset: Story = {
  args: {
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with custom offset distance from the trigger element.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Offset tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with delayed appearance for better user experience.
 */
export const WithDelay: Story = {
  args: {
    delayDuration: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with a 500ms delay before appearing, useful for preventing accidental triggers.',
      },
    },
  },
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip delayDuration={args.delayDuration}>
      <TooltipTrigger asChild>
        <Button>Delayed tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with an icon trigger for compact interfaces.
 */
export const WithIcon: Story = {
  args: {
    children: 'User profile settings',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip triggered by an icon button, commonly used in navigation bars and toolbars.',
      },
    },
  },
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label="User tooltip" size="icon" variant="ghost">
          <User />
        </Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with information icon for help text.
 */
export const InfoTooltip: Story = {
  args: {
    children: 'This feature is currently in beta',
  },
  parameters: {
    docs: {
      description: {
        story: 'Information tooltip commonly used for help text and feature explanations.',
      },
    },
  },
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label="Info tooltip" size="icon" variant="ghost">
          <Info />
        </Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with settings icon for configuration options.
 */
export const SettingsTooltip: Story = {
  args: {
    children: 'Configure notification preferences',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings tooltip for configuration and preference options.',
      },
    },
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label="Settings tooltip" size="icon" variant="ghost">
          <Settings />
        </Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with mail icon for email-related actions.
 */
export const MailTooltip: Story = {
  args: {
    children: 'Send email notification',
  },
  parameters: {
    docs: {
      description: {
        story: 'Mail tooltip for email-related actions and notifications.',
      },
    },
  },
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label="Mail tooltip" size="icon" variant="ghost">
          <Mail />
        </Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Tooltip with longer content for detailed explanations.
 */
export const LongContent: Story = {
  args: {
    children: 'This is a longer tooltip that provides more detailed information about the feature or action.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with longer content that demonstrates text wrapping and readability.',
      },
    },
  },
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Long tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

/**
 * Multiple tooltips demonstrating different positions and content.
 */
export const MultipleTooltips: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of multiple tooltips with different positions and content types.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Top tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Bottom tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Left tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Right tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-label="Information tooltip" size="icon" variant="ghost">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Information tooltip</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Interactive test story for accessibility and functionality testing.
 */
export const InteractiveTest: Story = {
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
  render: (args: TooltipContentProps & TooltipProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Test tooltip</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};
