import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import type { ShortBlogPost } from '@repo/api-models';

import { BlogPostCard } from './BlogPostCard';

const mockBlogPost: ShortBlogPost = {
  alternatives: [],
  author: null,
  createdAt: '2024-01-01T00:00:00Z',
  entryId: 'entry-id',
  id: 'test-id',
  languageCode: 'en',
  publishedAt: '2024-01-01T00:00:00Z',
  readingTime: 5,
  shortDescription: 'This is a test blog post description',
  slug: 'test-blog-post',
  tags: [],
  title: 'Test Blog Post',
};

describe('BlogPostCard', () => {
  it('should render blog post card with reading time', async ({ instance, TestWrapper }) => {
    const t = instance.getFixedT(null, 'common');

    render(
      <TestWrapper>
        <I18nextProvider i18n={instance}>
          <BlogPostCard blogPost={mockBlogPost} />
        </I18nextProvider>
      </TestWrapper>
    );

    // Check that the title is rendered
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();

    // Check that the description is rendered
    expect(screen.getByText('This is a test blog post description')).toBeInTheDocument();

    // Check that the reading time is rendered
    expect(screen.getByText(t('{{number}} min read', { number: 5 }))).toBeInTheDocument();
  });

  it('should render reading time with different values', async ({ TestWrapper, instance }) => {
    const t = instance.getFixedT(null, 'common');

    const blogPostWith1Min: ShortBlogPost = {
      ...mockBlogPost,
      readingTime: 1,
    };

    render(
      <TestWrapper>
        <BlogPostCard blogPost={blogPostWith1Min} />
      </TestWrapper>
    );
    expect(screen.getByText(t('{{number}} min read', { number: 1 }))).toBeInTheDocument();

    const blogPostWith30Min: ShortBlogPost = {
      ...mockBlogPost,
      readingTime: 30,
    };

    render(
      <TestWrapper>
        <BlogPostCard blogPost={blogPostWith30Min} />
      </TestWrapper>
    );
    expect(screen.getByText(t('{{number}} min read', { number: 30 }))).toBeInTheDocument();
  });

  it('should render reading time with minimum value', async ({ TestWrapper, instance }) => {
    const t = instance.getFixedT(null, 'common');

    const blogPostWithMinReadingTime: ShortBlogPost = {
      ...mockBlogPost,
      readingTime: 1,
    };

    render(
      <TestWrapper>
        <BlogPostCard blogPost={blogPostWithMinReadingTime} />
      </TestWrapper>
    );
    expect(screen.getByText(t('{{number}} min read', { number: 1 }))).toBeInTheDocument();
  });

  it('should render reading time with maximum value', async ({ TestWrapper, instance }) => {
    const t = instance.getFixedT(null, 'common');

    const blogPostWithMaxReadingTime: ShortBlogPost = {
      ...mockBlogPost,
      readingTime: 999,
    };

    render(
      <TestWrapper>
        <BlogPostCard blogPost={blogPostWithMaxReadingTime} />
      </TestWrapper>
    );
    expect(screen.getByText(t('{{number}} min read', { number: 999 }))).toBeInTheDocument();
  });

  it('should handle blog post without reading time gracefully', async ({ TestWrapper, instance }) => {
    const t = instance.getFixedT(null, 'common');

    const blogPostWithoutReadingTime = {
      ...mockBlogPost,
      readingTime: 0, // Use 0 instead of undefined since readingTime is required
    };

    render(
      <TestWrapper>
        <BlogPostCard blogPost={blogPostWithoutReadingTime} />
      </TestWrapper>
    );

    // The component should still render without crashing
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test blog post description')).toBeInTheDocument();

    // Reading time should not be rendered for 0 value
    expect(screen.queryByText(t('{{number}} min read', { number: 0 }))).not.toBeInTheDocument();
  });
});
