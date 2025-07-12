import type { Meta, StoryObj } from '@storybook/react';
import { NewspaperIcon } from 'lucide-react';
import { type ChangeEventHandler, useState } from 'react';

import * as SearchInterface from './SearchInterface';
import searchInterfaceMdx from './SearchInterface.mdx';
import * as SearchResultItem from './SearchResultItem';

const meta: Meta<typeof SearchInterface.Root> = {
  argTypes: {
    initialQuery: {
      control: 'text',
      description: 'Initial search query',
    },
  },
  component: SearchInterface.Root,

  decorators: [
    (Story) => (
      <div className="mx-auto w-lg ">
        <Story />
      </div>
    ),
  ],
  parameters: { doc: { page: searchInterfaceMdx } },
  tags: ['autodocs'],
  title: 'Components/SearchInterface',
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockSearchResultItems = [
  <SearchResultItem.Root key="1">
    <SearchResultItem.Icon>
      <NewspaperIcon className="text-yellow-500" />
    </SearchResultItem.Icon>

    <SearchResultItem.Content>
      <SearchResultItem.Header>
        <span className="text-xs">🎨</span>
        <span className="font-mono text-muted-foreground text-xs">css-grid-auto-fit-trick.md</span>
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
          Shard
        </span>
      </SearchResultItem.Header>

      <SearchResultItem.Title>Quick CSS Grid Auto-Fit Trick</SearchResultItem.Title>

      <SearchResultItem.Description>
        Use CSS Grid auto-fit to create responsive layouts without media queries. Perfect for card layouts that adapt to
        container width automatically.
      </SearchResultItem.Description>

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
  </SearchResultItem.Root>,

  <SearchResultItem.Root key="2">
    <SearchResultItem.Icon>
      <NewspaperIcon className="text-blue-500" />
    </SearchResultItem.Icon>

    <SearchResultItem.Content>
      <SearchResultItem.Header>
        <span className="text-xs">💡</span>
        <span className="font-mono text-muted-foreground text-xs">typescript-best-practices.md</span>
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
          Shard
        </span>
      </SearchResultItem.Header>

      <SearchResultItem.Title>TypeScript Best Practices</SearchResultItem.Title>

      <SearchResultItem.Description>
        Essential TypeScript patterns and best practices for better code quality.
      </SearchResultItem.Description>

      <SearchResultItem.Footer>
        <SearchResultItem.Meta>
          <SearchResultItem.Author>David Kim</SearchResultItem.Author>
          <SearchResultItem.DateComponent>1 month ago</SearchResultItem.DateComponent>
          <SearchResultItem.ReadingTime>15 min read</SearchResultItem.ReadingTime>
        </SearchResultItem.Meta>
      </SearchResultItem.Footer>

      <SearchResultItem.Tags>
        <SearchResultItem.Tag>#typescript</SearchResultItem.Tag>
        <SearchResultItem.Tag>#patterns</SearchResultItem.Tag>
        <SearchResultItem.Tag>#best-practices</SearchResultItem.Tag>
        <SearchResultItem.MoreTags>+1</SearchResultItem.MoreTags>
      </SearchResultItem.Tags>
    </SearchResultItem.Content>
    <SearchResultItem.Arrow />
  </SearchResultItem.Root>,

  <SearchResultItem.Root key="3">
    <SearchResultItem.Icon>
      <NewspaperIcon className="text-green-500" />
    </SearchResultItem.Icon>

    <SearchResultItem.Content>
      <SearchResultItem.Header>
        <span className="text-xs">💡</span>
        <span className="font-mono text-muted-foreground text-xs">css-grid-layout.md</span>
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
          Shard
        </span>
      </SearchResultItem.Header>

      <SearchResultItem.Title>Master CSS Grid Layout</SearchResultItem.Title>

      <SearchResultItem.Description>
        Master CSS Grid layout with practical examples and real-world use cases.
      </SearchResultItem.Description>

      <SearchResultItem.Footer>
        <SearchResultItem.Meta>
          <SearchResultItem.Author>John Doe</SearchResultItem.Author>
          <SearchResultItem.DateComponent>2 weeks ago</SearchResultItem.DateComponent>
          <SearchResultItem.ReadingTime>25 min read</SearchResultItem.ReadingTime>
        </SearchResultItem.Meta>
      </SearchResultItem.Footer>

      <SearchResultItem.Tags>
        <SearchResultItem.Tag>#css</SearchResultItem.Tag>
        <SearchResultItem.Tag>#grid</SearchResultItem.Tag>
      </SearchResultItem.Tags>
    </SearchResultItem.Content>
    <SearchResultItem.Arrow />
  </SearchResultItem.Root>,
];

export const Default: Story = {
  render: (args) => (
    <SearchInterface.Root {...args}>
      <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="" />
      <SearchInterface.Prompt
        keyMap={[
          { description: 'Navigate', key: '↑↓' },
          { description: 'Select', key: 'Enter' },
          { description: 'Close', key: 'Esc' },
        ]}
        message="Type to search through blog posts, shards, and series"
        title="Search your content"
      />
    </SearchInterface.Root>
  ),
};

export const WithSearchResults: Story = {
  render: (args) => (
    <SearchInterface.Root {...args}>
      <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="react" />
      {mockSearchResultItems}
      <SearchInterface.ViewAll onViewAll={() => {}} totalCount={15} />
    </SearchInterface.Root>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <SearchInterface.Root {...args}>
      <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="react" />
      <SearchInterface.Loading>Searching...</SearchInterface.Loading>
    </SearchInterface.Root>
  ),
};

export const ErrorState: Story = {
  render: (args) => (
    <SearchInterface.Root {...args}>
      <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="react" />
      <SearchInterface.ErrorState isRetrying={false} onRetry={() => {}}>
        Network error. Please check your connection and try again.
      </SearchInterface.ErrorState>
    </SearchInterface.Root>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <SearchInterface.Root {...args}>
      <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="nonexistent" />
      <SearchInterface.Empty
        message="No content matches"
        query="qwe"
        tip="Try searching for different keywords or check your spelling"
        title="No results found"
      />
    </SearchInterface.Root>
  ),
};

export const ComplexExample: Story = {
  render: (args) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;

      setQuery(value);
      setIsLoading(value.length >= 3);
      setHasError(false);

      // Simulate loading
      if (value.length >= 3) setTimeout(() => setIsLoading(false), 2000);
    };

    const handleRetry = () => {
      setHasError(false);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <SearchInterface.Root {...args}>
        <SearchInterface.Input onChange={handleQueryChange} placeholder="Search shards..." value={query} />

        {isLoading && <SearchInterface.Loading>Searching...</SearchInterface.Loading>}
        {hasError && (
          <SearchInterface.ErrorState isRetrying={isLoading} onRetry={handleRetry}>
            Network error. Please check your connection and try again.
          </SearchInterface.ErrorState>
        )}
        {!isLoading && !hasError && query.length >= 3 && mockSearchResultItems.length === 0 && (
          <SearchInterface.Empty
            message="No shards found. Try a different search term."
            query="qwe"
            tip="Try searching for different keywords or check your spelling"
            title="No results found"
          />
        )}

        {!isLoading && !hasError && query.length >= 3 && mockSearchResultItems.length > 0 && (
          <SearchInterface.Content>{mockSearchResultItems}</SearchInterface.Content>
        )}

        {!isLoading && !hasError && query.length < 3 && (
          <SearchInterface.Prompt
            keyMap={[
              { description: 'Navigate', key: '↑↓' },
              { description: 'Select', key: 'Enter' },
              { description: 'Close', key: 'Esc' },
            ]}
            message="Type at least 3 characters to search"
            title="Search your content"
          />
        )}
      </SearchInterface.Root>
    );
  },
};

// Individual component stories
export const InputComponent: Story = {
  render: () => <SearchInterface.Input onChange={() => {}} placeholder="Search shards..." value="" />,
};

export const LoadingComponent: Story = {
  render: () => <SearchInterface.Loading>Searching...</SearchInterface.Loading>,
};

export const ErrorComponent: Story = {
  render: () => <SearchInterface.ErrorState isRetrying={false} onRetry={() => {}} />,
};

export const EmptyComponent: Story = {
  render: () => (
    <SearchInterface.Empty
      message="No results found"
      query="qwe"
      tip="Try searching for different keywords or check your spelling"
      title="No results found"
    />
  ),
};

export const ViewAllComponent: Story = {
  render: () => <SearchInterface.ViewAll onViewAll={() => {}} totalCount={25} />,
};
