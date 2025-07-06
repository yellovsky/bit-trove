import type { Meta, StoryObj } from '@storybook/react';

import { BlogPostMetadata } from './BlogPostMetadata';

const meta = {
  args: {
    author: {
      name: 'John Doe',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 5,
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'TypeScript', slug: 'typescript' },
      { id: '3', name: 'Frontend', slug: 'frontend' },
    ],
  },
  argTypes: {
    author: {
      control: 'object',
      description: 'Author information with name',
      table: {
        category: 'Content',
        type: { summary: '{ name: string } | null' },
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
    publishedAt: {
      control: 'text',
      description: 'Publication date in ISO string format',
      table: {
        category: 'Content',
        type: { summary: 'string | null' },
      },
    },
    readingTime: {
      control: { max: 60, min: 1, type: 'number' },
      description: 'Reading time in minutes',
      table: {
        category: 'Content',
        type: { summary: 'number' },
      },
    },
    tags: {
      control: 'object',
      description: 'Array of tag objects with id, name, and slug',
      table: {
        category: 'Content',
        type: { summary: 'Array<{ id: string; name: string; slug: string }>' },
      },
    },
  },
  component: BlogPostMetadata,
  parameters: {
    docs: {
      description: {
        component:
          'BlogPostMetadata displays author information, publication date, reading time, and tags for blog posts. It provides a comprehensive overview of the post metadata in a clean, accessible format.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'Features/BlogPosts/BlogPostMetadata',
} satisfies Meta<typeof BlogPostMetadata>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete blog post metadata with all information displayed.
 * This is the most common usage pattern for published blog posts.
 */
export const Complete: Story = {
  args: {
    author: {
      name: 'John Doe',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 8,
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'TypeScript', slug: 'typescript' },
      { id: '3', name: 'Frontend', slug: 'frontend' },
      { id: '4', name: 'Development', slug: 'development' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete metadata display with author, publication date, reading time, and multiple tags. This represents a typical published blog post.',
      },
    },
  },
};

/**
 * Blog post metadata without author information.
 * Useful for anonymous posts or when author is not available.
 */
export const WithoutAuthor: Story = {
  args: {
    author: null,
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 5,
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'TypeScript', slug: 'typescript' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Metadata display without author information. The author section is hidden when no author is provided.',
      },
    },
  },
};

/**
 * Blog post metadata without publication date.
 * Useful for draft posts or when date is not yet set.
 */
export const WithoutDate: Story = {
  args: {
    author: {
      name: 'Jane Smith',
    },
    publishedAt: null,
    readingTime: 3,
    tags: [
      { id: '1', name: 'Draft', slug: 'draft' },
      { id: '2', name: 'Work in Progress', slug: 'work-in-progress' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Metadata display without publication date. Useful for draft posts or content that has not been published yet.',
      },
    },
  },
};

/**
 * Blog post metadata without reading time.
 * Useful when reading time calculation is not available.
 */
export const WithoutReadingTime: Story = {
  args: {
    author: {
      name: 'Alice Johnson',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: undefined,
    tags: [{ id: '1', name: 'Quick Read', slug: 'quick-read' }],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Metadata display without reading time. The reading time indicator is hidden when no reading time is provided',
      },
    },
  },
};

/**
 * Blog post metadata without tags.
 * Useful for posts that don't require categorization.
 */
export const WithoutTags: Story = {
  args: {
    author: {
      name: 'Bob Wilson',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 12,
    tags: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metadata display without tags. The tags section is hidden when no tags are provided.',
      },
    },
  },
};

/**
 * Blog post metadata with many tags.
 * Demonstrates how the component handles multiple tags.
 */
export const ManyTags: Story = {
  args: {
    author: {
      name: 'David Miller',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 15,
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'TypeScript', slug: 'typescript' },
      { id: '3', name: 'Frontend', slug: 'frontend' },
      { id: '4', name: 'Development', slug: 'development' },
      { id: '5', name: 'JavaScript', slug: 'javascript' },
      { id: '6', name: 'Web', slug: 'web' },
      { id: '7', name: 'Programming', slug: 'programming' },
      { id: '8', name: 'Tutorial', slug: 'tutorial' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Metadata display with many tags. Demonstrates how the component handles multiple tags and wraps them appropriately.',
      },
    },
  },
};

/**
 * Blog post metadata with long author name.
 * Tests the component's handling of longer text content.
 */
export const LongAuthorName: Story = {
  args: {
    author: {
      name: 'Dr. Elizabeth Alexandra Montgomery-Jones',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 7,
    tags: [
      { id: '1', name: 'Research', slug: 'research' },
      { id: '2', name: 'Academic', slug: 'academic' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Metadata display with a long author name. Tests the component's handling of longer text content and ensures proper layout.",
      },
    },
  },
};

/**
 * Blog post metadata with long tag names.
 * Tests the component's handling of longer tag names.
 */
export const LongTagNames: Story = {
  args: {
    author: {
      name: 'Sarah Chen',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 10,
    tags: [
      { id: '1', name: 'Very Long Tag Name That Might Wrap', slug: 'very-long-tag-name' },
      { id: '2', name: 'Another Extremely Long Tag Name', slug: 'another-extremely-long-tag-name' },
      { id: '3', name: 'Super Long Tag Name For Testing', slug: 'super-long-tag-name' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Metadata display with long tag names. Tests the component's handling of longer tag names and ensures proper wrapping.",
      },
    },
  },
};

/**
 * Blog post metadata with custom styling.
 * Demonstrates the use of the className prop for custom styling.
 */
export const WithCustomStyling: Story = {
  args: {
    author: {
      name: 'Mike Anderson',
    },
    className: 'border border-border rounded-lg p-4 bg-muted/50',
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 6,
    tags: [
      { id: '1', name: 'Custom', slug: 'custom' },
      { id: '2', name: 'Styling', slug: 'styling' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Metadata display with custom styling applied via the className prop. Demonstrates how to customize the appearance.',
      },
    },
  },
};

/**
 * Interactive test story for accessibility and functionality testing.
 */
export const InteractiveTest: Story = {
  args: {
    author: {
      name: 'Test User',
    },
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 5,
    tags: [
      { id: '1', name: 'Test', slug: 'test' },
      { id: '2', name: 'Interactive', slug: 'interactive' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive test story for accessibility and functionality testing. Use this story to test keyboard navigation, screen readers, and other interactive features.',
      },
    },
  },
};
