import type { Meta, StoryObj } from '@storybook/react';

import { Blockquote, Heading, ListItem, Paragraph, TextLink, UnorderedList } from './Typography';
import TypographyMdx from './Typography.mdx';

const meta = {
  args: {
    children: 'Heading',
    order: 1,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to display',
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
  },
  component: Heading,
  parameters: {
    docs: {
      page: TypographyMdx,
    },
  },
  tags: ['autodocs'],
  title: 'UI/Typography',
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete typography example showing all components in context.
 */
export const CompleteExample: Story = {
  args: {
    children: 'Taxing Laughter: The Joke Tax Chronicles',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete example showing all typography components working together in a narrative context.',
      },
    },
  },
  render: (args) => (
    <div className="max-w-4xl space-y-6">
      <Heading {...args} />
      <Paragraph>
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One
        day, his advisors came to him with a problem: the kingdom was running out of money.
      </Paragraph>
      <Heading order={2}>The King's Plan</Heading>
      <Paragraph>
        The king thought long and hard, and finally came up with <TextLink to="#">a brilliant plan</TextLink>: he would
        tax the jokes in the kingdom.
      </Paragraph>
      <Blockquote>
        "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
      </Blockquote>
      <Heading order={3}>The Joke Tax</Heading>
      <Paragraph>The king's subjects were not amused. They grumbled and complained, but the king was firm:</Paragraph>
      <UnorderedList>
        <ListItem>1st level of puns: 5 gold coins</ListItem>
        <ListItem>2nd level of jokes: 10 gold coins</ListItem>
        <ListItem>3rd level of one-liners : 20 gold coins</ListItem>
      </UnorderedList>
      <Paragraph>
        As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who
        refused to let the king's foolishness get him down: a court jester named Jokester.
      </Paragraph>
      <Heading order={3}>Jokester's Revolt</Heading>
      <Paragraph>
        Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under
        the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop
        Jokester.
      </Paragraph>
      <Paragraph>
        And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they
        couldn't help but laugh. And once they started laughing, they couldn't stop.
      </Paragraph>
      <Heading order={3}>The People's Rebellion</Heading>
      <Paragraph>
        The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the
        entire kingdom was in on the joke.
      </Paragraph>
      <Paragraph>
        The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
        Jokester was declared a hero, and the kingdom lived happily ever after. The moral of the story is: never
        underestimate the power of a good laugh and always be careful of bad ideas.
      </Paragraph>
    </div>
  ),
};

/**
 * Heading hierarchy demonstration.
 */
export const HeadingHierarchy: Story = {
  args: {
    children: 'Heading Level 1',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all heading levels with proper semantic hierarchy and visual scaling.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Heading order={1}>Heading Level 1</Heading>
      <Heading order={2}>Heading Level 2</Heading>
      <Heading order={3}>Heading Level 3</Heading>
    </div>
  ),
};

/**
 * Paragraph with various content types.
 */
export const ParagraphExample: Story = {
  args: {
    children: 'This is a standard paragraph',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Paragraph component with various content types including links and inline formatting.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Paragraph>
        This is a standard paragraph with regular text content. It demonstrates the default styling and spacing that
        should be used for body text throughout the application.
      </Paragraph>
      <Paragraph>
        This paragraph contains a <TextLink to="#">link to another page</TextLink> to show how text links are integrated
        within paragraph content.
      </Paragraph>
      <Paragraph>
        Paragraphs can contain <strong>bold text</strong>, <em>italic text</em>, and other inline formatting while
        maintaining consistent spacing and typography.
      </Paragraph>
    </div>
  ),
};

/**
 * Blockquote styling and usage.
 */
export const BlockquoteExample: Story = {
  args: {
    children: 'Blockquote Example',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Blockquote component for highlighting important quotes or citations with proper styling and spacing.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Paragraph>Here's a paragraph that introduces a quote:</Paragraph>
      <Blockquote>
        "The best way to predict the future is to invent it. Really try to invent the future. Don't try to predict it,
        predict it by inventing it."
      </Blockquote>
      <Paragraph>And here's a paragraph that follows the quote, demonstrating proper spacing and flow.</Paragraph>
    </div>
  ),
};

/**
 * List components demonstration.
 */
export const ListExample: Story = {
  args: {
    children: 'List Example',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'List components demonstrating unordered lists with proper nesting and content integration.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading order={3}>Unordered List</Heading>
        <UnorderedList>
          <ListItem>First item in the list</ListItem>
          <ListItem>Second item with some longer content to show wrapping</ListItem>
          <ListItem>Third item</ListItem>
          <ListItem>
            Fourth item with a <TextLink to="#">link</TextLink>
          </ListItem>
        </UnorderedList>
      </div>

      <div>
        <Heading order={3}>Nested Lists</Heading>
        <UnorderedList>
          <ListItem>Main item 1</ListItem>
          <ListItem>
            Main item 2 with nested content
            <UnorderedList>
              <ListItem>Nested item 1</ListItem>
              <ListItem>Nested item 2</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Main item 3</ListItem>
        </UnorderedList>
      </div>
    </div>
  ),
};

/**
 * Text link component demonstration.
 */
export const TextLinkExample: Story = {
  args: {
    children: 'Text Link Example',
    order: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'TextLink component demonstrating inline link styling and accessibility features.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Paragraph>
        This paragraph contains a <TextLink to="/docs">link to documentation</TextLink> that demonstrates how text links
        are styled within content.
      </Paragraph>
      <Paragraph>
        Links can also be used in <TextLink to="/about">different contexts</TextLink> and will maintain consistent
        styling and accessibility features.
      </Paragraph>
      <Paragraph>
        <TextLink to="/contact">Contact us</TextLink> for more information about our services.
      </Paragraph>
    </div>
  ),
};

/**
 * Interactive test story for accessibility and functionality testing.
 */
export const InteractiveTest: Story = {
  args: {
    children: 'Interactive Test',
    order: 1,
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
  render: () => (
    <div className="space-y-4">
      <Heading order={1}>Interactive Test</Heading>
      <Paragraph>
        This is a test paragraph with a <TextLink to="#">test link</TextLink> for accessibility testing.
      </Paragraph>
      <UnorderedList>
        <ListItem>Test item 1</ListItem>
        <ListItem>Test item 2</ListItem>
      </UnorderedList>
    </div>
  ),
};
