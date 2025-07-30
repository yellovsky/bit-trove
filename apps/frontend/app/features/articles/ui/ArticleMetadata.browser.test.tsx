import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ArticleMetadata } from './ArticleMetadata';

// Mock the translation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
    },
    t: (key: string, options?: { number?: number }) => {
      if (key === '{{number}} min read') {
        return `${options?.number} mins read`;
      }
      return key;
    },
  }),
}));

describe('ArticleMetadata', () => {
  it('renders complete metadata with all information', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: '2024-01-15T10:30:00Z',
      readingTime: 5,
      tags: [
        { id: '1', name: 'React', slug: 'react' },
        { id: '2', name: 'TypeScript', slug: 'typescript' },
      ],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('5 mins read')).toBeInTheDocument();
    // Date will be formatted by Intl.DateTimeFormat, so we check for the year
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('renders without author when not provided', () => {
    const props = {
      publishedAt: '2024-01-15T10:30:00Z',
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('5 mins read')).toBeInTheDocument();
  });

  it('renders without tags when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: '2024-01-15T10:30:00Z',
      readingTime: 5,
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
    expect(screen.getByText('5 mins read')).toBeInTheDocument();
  });

  it('renders without reading time when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: '2024-01-15T10:30:00Z',
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('5 mins read')).not.toBeInTheDocument();
  });

  it('renders without publication date when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('5 mins read')).toBeInTheDocument();
    expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const props = {
      author: { name: 'John Doe' },
      className: 'custom-class',
      readingTime: 5,
    };

    const { container } = render(<ArticleMetadata {...props} />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with multiple tags', () => {
    const props = {
      author: { name: 'John Doe' },
      readingTime: 5,
      tags: [
        { id: '1', name: 'React', slug: 'react' },
        { id: '2', name: 'TypeScript', slug: 'typescript' },
        { id: '3', name: 'Frontend', slug: 'frontend' },
      ],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders with empty tags array', () => {
    const props = {
      author: { name: 'John Doe' },
      readingTime: 5,
      tags: [],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });

  it('renders with null author', () => {
    const props = {
      author: null,
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders with null publishedAt', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: null,
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<ArticleMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
  });
});
