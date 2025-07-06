import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlogPostMetadata } from './BlogPostMetadata';

describe('BlogPostMetadata', () => {
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

    render(<BlogPostMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('By')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders without author when not provided', () => {
    const props = {
      publishedAt: '2024-01-15T10:30:00Z',
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<BlogPostMetadata {...props} />);

    expect(screen.queryByText('By')).not.toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders without tags when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: '2024-01-15T10:30:00Z',
      readingTime: 5,
    };

    render(<BlogPostMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });

  it('renders without reading time when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      publishedAt: '2024-01-15T10:30:00Z',
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<BlogPostMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders without publication date when not provided', () => {
    const props = {
      author: { name: 'John Doe' },
      readingTime: 5,
      tags: [{ id: '1', name: 'React', slug: 'react' }],
    };

    render(<BlogPostMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const props = {
      author: { name: 'John Doe' },
      className: 'custom-class',
      readingTime: 5,
    };

    const { container } = render(<BlogPostMetadata {...props} />);

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

    render(<BlogPostMetadata {...props} />);

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

    render(<BlogPostMetadata {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });
});
