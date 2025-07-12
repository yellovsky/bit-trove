import type { Meta, StoryObj } from '@storybook/react';
import { NewspaperIcon } from 'lucide-react';

import * as SearchResultItem from './SearchResultItem';
import searchResultItemMdx from './SearchResultItem.mdx';

const meta: Meta<typeof SearchResultItem.Root> = {
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
    },
  },
  component: SearchResultItem.Root,
  parameters: {
    docs: { page: searchResultItemMdx },
    layout: 'padded',
  },
  tags: ['autodocs'],
  title: 'Components/SearchResultItem',
};

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------------------------------
 * Default Story
 * -----------------------------------------------------------------------------------------------*/

export const Default: Story = {
  render: () => (
    <SearchResultItem.Root>
      <SearchResultItem.Icon>
        <NewspaperIcon className="text-blue-600" />
      </SearchResultItem.Icon>

      <SearchResultItem.Content>
        <SearchResultItem.Header>
          <span className="text-xs">📄</span>
          <span className="font-mono text-muted-foreground text-xs">advanced-typescript-patterns-react.md</span>
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
            blog post
          </span>
        </SearchResultItem.Header>

        <SearchResultItem.Title>Advanced TypeScript Patterns for React Applications</SearchResultItem.Title>

        <SearchResultItem.Description>
          Explore advanced TypeScript patterns including{' '}
          <mark className="rounded bg-yellow-500/30 px-0.5 text-foreground">co</mark>nditional types, mapped types, and
          template literal types to build more robust React applications with better type safety and developer
          experience.
        </SearchResultItem.Description>

        <SearchResultItem.Category>
          <SearchResultItem.CategoryIcon>TypeScript Mastery</SearchResultItem.CategoryIcon>
        </SearchResultItem.Category>

        <SearchResultItem.Footer>
          <SearchResultItem.Meta>
            <SearchResultItem.Author>Sarah Chen</SearchResultItem.Author>
            <SearchResultItem.DateComponent>7 months ago</SearchResultItem.DateComponent>
            <SearchResultItem.ReadingTime>12 min read</SearchResultItem.ReadingTime>
          </SearchResultItem.Meta>
        </SearchResultItem.Footer>

        <SearchResultItem.Tags>
          <SearchResultItem.Tag>#typescript</SearchResultItem.Tag>
          <SearchResultItem.Tag>#react</SearchResultItem.Tag>
          <SearchResultItem.Tag>#patterns</SearchResultItem.Tag>
          <SearchResultItem.MoreTags>+1</SearchResultItem.MoreTags>
        </SearchResultItem.Tags>
      </SearchResultItem.Content>
      <SearchResultItem.Arrow />
    </SearchResultItem.Root>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Minimal Story
 * -----------------------------------------------------------------------------------------------*/

export const Minimal: Story = {
  render: () => (
    <SearchResultItem.Root>
      <SearchResultItem.Icon>
        <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500/10">
          <span className="text-green-600 text-xs">💡</span>
        </div>
      </SearchResultItem.Icon>
      <SearchResultItem.Content>
        <SearchResultItem.Title>Quick Tips for React Development</SearchResultItem.Title>
        <SearchResultItem.Description>
          Essential tips and tricks for improving your React development workflow and code quality.
        </SearchResultItem.Description>
      </SearchResultItem.Content>
      <SearchResultItem.Arrow />
    </SearchResultItem.Root>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * With Long Content
 * -----------------------------------------------------------------------------------------------*/

export const WithLongContent: Story = {
  render: () => (
    <SearchResultItem.Root>
      <SearchResultItem.Icon>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-500/10">
          <span className="text-purple-600 text-sm">📚</span>
        </div>
      </SearchResultItem.Icon>
      <SearchResultItem.Content>
        <SearchResultItem.Header>
          <span className="text-xs">📚</span>
          <span className="font-mono text-muted-foreground text-xs">
            comprehensive-guide-to-nextjs-13-app-router.md
          </span>
          <div className="h-2 w-2 rounded-full bg-purple-500" />
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
            guide
          </span>
        </SearchResultItem.Header>
        <SearchResultItem.Title>
          A Comprehensive Guide to Next.js 13 App Router: From Basics to Advanced Patterns
        </SearchResultItem.Title>
        <SearchResultItem.Description>
          This extensive guide covers everything you need to know about Next.js 13 App Router, including server
          components, streaming, parallel routes, intercepting routes, and advanced patterns for building modern web
          applications. Learn how to leverage the new architecture for better performance and developer experience.
        </SearchResultItem.Description>
        <SearchResultItem.Category>
          <SearchResultItem.CategoryIcon>Next.js Deep Dive</SearchResultItem.CategoryIcon>
        </SearchResultItem.Category>
        <SearchResultItem.Footer>
          <SearchResultItem.Meta>
            <SearchResultItem.Author>Alex Rodriguez</SearchResultItem.Author>
            <SearchResultItem.DateComponent>2 weeks ago</SearchResultItem.DateComponent>
            <SearchResultItem.ReadingTime>45 min read</SearchResultItem.ReadingTime>
          </SearchResultItem.Meta>
        </SearchResultItem.Footer>
        <SearchResultItem.Tags>
          <SearchResultItem.Tag>#nextjs</SearchResultItem.Tag>
          <SearchResultItem.Tag>#react</SearchResultItem.Tag>
          <SearchResultItem.Tag>#app-router</SearchResultItem.Tag>
          <SearchResultItem.Tag>#server-components</SearchResultItem.Tag>
          <SearchResultItem.Tag>#streaming</SearchResultItem.Tag>
          <SearchResultItem.MoreTags>+3</SearchResultItem.MoreTags>
        </SearchResultItem.Tags>
      </SearchResultItem.Content>
      <SearchResultItem.Arrow />
    </SearchResultItem.Root>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Responsive Demo
 * -----------------------------------------------------------------------------------------------*/

export const ResponsiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how the SearchResultItem component adapts to different container sizes. Notice how meta information and match types are hidden on smaller containers.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="mb-4 text-muted-foreground text-sm">
        Resize the browser window to see how the component adapts to different screen sizes:
      </div>
      <div className="space-y-2">
        <div className="font-medium text-muted-foreground text-xs">Wide container (default):</div>
        <div className="w-full max-w-4xl">
          <SearchResultItem.Root>
            <SearchResultItem.Icon>
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500/10">
                <span className="text-blue-600 text-sm">📄</span>
              </div>
            </SearchResultItem.Icon>
            <SearchResultItem.Content>
              <SearchResultItem.Header>
                <span className="text-xs">📄</span>
                <span className="font-mono text-muted-foreground text-xs">responsive-design-patterns.md</span>
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
                  article
                </span>
              </SearchResultItem.Header>
              <SearchResultItem.Title>Responsive Design Patterns for Modern Web Applications</SearchResultItem.Title>
              <SearchResultItem.Description>
                Learn how to implement responsive design patterns that work across all devices and screen sizes.
              </SearchResultItem.Description>
              <SearchResultItem.Category>
                <SearchResultItem.CategoryIcon>Design Systems</SearchResultItem.CategoryIcon>
              </SearchResultItem.Category>
              <SearchResultItem.Footer>
                <SearchResultItem.Meta>
                  <SearchResultItem.Author>Maria Garcia</SearchResultItem.Author>
                  <SearchResultItem.DateComponent>1 month ago</SearchResultItem.DateComponent>
                  <SearchResultItem.ReadingTime>8 min read</SearchResultItem.ReadingTime>
                </SearchResultItem.Meta>
              </SearchResultItem.Footer>
              <SearchResultItem.Tags>
                <SearchResultItem.Tag>#responsive</SearchResultItem.Tag>
                <SearchResultItem.Tag>#design</SearchResultItem.Tag>
                <SearchResultItem.Tag>#css</SearchResultItem.Tag>
              </SearchResultItem.Tags>
            </SearchResultItem.Content>
            <SearchResultItem.Arrow />
          </SearchResultItem.Root>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-muted-foreground text-xs">Medium container (@[600px]):</div>
        <div className="w-full max-w-2xl">
          <SearchResultItem.Root>
            <SearchResultItem.Icon>
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500/10">
                <span className="text-green-600 text-xs">💡</span>
              </div>
            </SearchResultItem.Icon>
            <SearchResultItem.Content>
              <SearchResultItem.Header>
                <span className="text-xs">💡</span>
                <span className="font-mono text-muted-foreground text-xs">css-container-queries.md</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
                  tip
                </span>
              </SearchResultItem.Header>
              <SearchResultItem.Title>CSS Container Queries: The Future of Responsive Design</SearchResultItem.Title>
              <SearchResultItem.Description>
                Discover how container queries can revolutionize your responsive design approach.
              </SearchResultItem.Description>
              <SearchResultItem.Category>
                <SearchResultItem.CategoryIcon>CSS Mastery</SearchResultItem.CategoryIcon>
              </SearchResultItem.Category>
              <SearchResultItem.Footer>
                <SearchResultItem.Meta>
                  <SearchResultItem.Author>David Kim</SearchResultItem.Author>
                  <SearchResultItem.DateComponent>3 days ago</SearchResultItem.DateComponent>
                  <SearchResultItem.ReadingTime>5 min read</SearchResultItem.ReadingTime>
                </SearchResultItem.Meta>
              </SearchResultItem.Footer>
              <SearchResultItem.Tags>
                <SearchResultItem.Tag>#css</SearchResultItem.Tag>
                <SearchResultItem.Tag>#container-queries</SearchResultItem.Tag>
              </SearchResultItem.Tags>
            </SearchResultItem.Content>
            <SearchResultItem.Arrow />
          </SearchResultItem.Root>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-muted-foreground text-xs">Narrow container (@[400px]):</div>
        <div className="w-full max-w-sm">
          <SearchResultItem.Root>
            <SearchResultItem.Icon>
              <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10">
                <span className="text-orange-600 text-xs">⚡</span>
              </div>
            </SearchResultItem.Icon>
            <SearchResultItem.Content>
              <SearchResultItem.Header>
                <span className="text-xs">⚡</span>
                <span className="font-mono text-muted-foreground text-xs">performance-tips.md</span>
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
                  quick tip
                </span>
              </SearchResultItem.Header>
              <SearchResultItem.Title>5 Quick Performance Tips for React Apps</SearchResultItem.Title>
              <SearchResultItem.Description>
                Simple but effective performance optimizations you can implement today.
              </SearchResultItem.Description>
              <SearchResultItem.Footer>
                <SearchResultItem.Meta>
                  <SearchResultItem.Author>Lisa Wang</SearchResultItem.Author>
                  <SearchResultItem.DateComponent>1 week ago</SearchResultItem.DateComponent>
                  <SearchResultItem.ReadingTime>3 min read</SearchResultItem.ReadingTime>
                </SearchResultItem.Meta>
              </SearchResultItem.Footer>
              <SearchResultItem.Tags>
                <SearchResultItem.Tag>#performance</SearchResultItem.Tag>
                <SearchResultItem.Tag>#react</SearchResultItem.Tag>
              </SearchResultItem.Tags>
            </SearchResultItem.Content>
            <SearchResultItem.Arrow />
          </SearchResultItem.Root>
        </div>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * With Custom Icons
 * -----------------------------------------------------------------------------------------------*/

export const WithCustomIcons: Story = {
  render: () => (
    <SearchResultItem.Root>
      <SearchResultItem.Icon>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-500">
          <span className="text-sm text-white">🎨</span>
        </div>
      </SearchResultItem.Icon>
      <SearchResultItem.Content>
        <SearchResultItem.Header>
          <span className="text-xs">🎨</span>
          <span className="font-mono text-muted-foreground text-xs">design-system-components.md</span>
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
            tutorial
          </span>
        </SearchResultItem.Header>
        <SearchResultItem.Title>Building a Design System with Compound Components</SearchResultItem.Title>
        <SearchResultItem.Description>
          Learn how to create flexible and reusable design system components using the compound component pattern.
        </SearchResultItem.Description>
        <SearchResultItem.Category>
          <SearchResultItem.CategoryIcon>Design Systems</SearchResultItem.CategoryIcon>
        </SearchResultItem.Category>
        <SearchResultItem.Footer>
          <SearchResultItem.Meta>
            <SearchResultItem.Author>Emma Thompson</SearchResultItem.Author>
            <SearchResultItem.DateComponent>2 weeks ago</SearchResultItem.DateComponent>
            <SearchResultItem.ReadingTime>15 min read</SearchResultItem.ReadingTime>
          </SearchResultItem.Meta>
        </SearchResultItem.Footer>
        <SearchResultItem.Tags>
          <SearchResultItem.Tag>#design-system</SearchResultItem.Tag>
          <SearchResultItem.Tag>#components</SearchResultItem.Tag>
          <SearchResultItem.Tag>#react</SearchResultItem.Tag>
        </SearchResultItem.Tags>
      </SearchResultItem.Content>
      <SearchResultItem.Arrow className="text-purple-500" />
    </SearchResultItem.Root>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Interactive Demo
 * -----------------------------------------------------------------------------------------------*/

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="mb-4 text-muted-foreground text-sm">
        Click on the search result items to see the hover and interaction states:
      </div>
      <div className="space-y-2">
        <SearchResultItem.Root onClick={() => alert('Clicked: TypeScript Patterns')}>
          <SearchResultItem.Icon>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500/10">
              <span className="text-blue-600 text-sm">📄</span>
            </div>
          </SearchResultItem.Icon>
          <SearchResultItem.Content>
            <SearchResultItem.Header>
              <span className="text-xs">📄</span>
              <span className="font-mono text-muted-foreground text-xs">typescript-patterns.md</span>
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
                article
              </span>
            </SearchResultItem.Header>
            <SearchResultItem.Title>Advanced TypeScript Patterns</SearchResultItem.Title>
            <SearchResultItem.Description>
              Master advanced TypeScript patterns for better type safety and developer experience.
            </SearchResultItem.Description>
            <SearchResultItem.Footer>
              <SearchResultItem.Meta>
                <SearchResultItem.Author>Sarah Chen</SearchResultItem.Author>
                <SearchResultItem.DateComponent>1 month ago</SearchResultItem.DateComponent>
                <SearchResultItem.ReadingTime>12 min read</SearchResultItem.ReadingTime>
              </SearchResultItem.Meta>
            </SearchResultItem.Footer>
          </SearchResultItem.Content>
          <SearchResultItem.Arrow />
        </SearchResultItem.Root>

        <SearchResultItem.Root onClick={() => alert('Clicked: React Performance')}>
          <SearchResultItem.Icon>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/10">
              <span className="text-green-600 text-sm">⚡</span>
            </div>
          </SearchResultItem.Icon>
          <SearchResultItem.Content>
            <SearchResultItem.Header>
              <span className="text-xs">⚡</span>
              <span className="font-mono text-muted-foreground text-xs">react-performance.md</span>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
                guide
              </span>
            </SearchResultItem.Header>
            <SearchResultItem.Title>React Performance Optimization Guide</SearchResultItem.Title>
            <SearchResultItem.Description>
              Comprehensive guide to optimizing React application performance.
            </SearchResultItem.Description>
            <SearchResultItem.Footer>
              <SearchResultItem.Meta>
                <SearchResultItem.Author>Alex Rodriguez</SearchResultItem.Author>
                <SearchResultItem.DateComponent>2 weeks ago</SearchResultItem.DateComponent>
                <SearchResultItem.ReadingTime>20 min read</SearchResultItem.ReadingTime>
              </SearchResultItem.Meta>
            </SearchResultItem.Footer>
          </SearchResultItem.Content>
          <SearchResultItem.Arrow />
        </SearchResultItem.Root>
      </div>
    </div>
  ),
};
