import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TableOfContents, type TableOfContentsItem } from './TableOfContents';

const mockItems: TableOfContentsItem[] = [
  { id: 'section-1', level: 1, title: 'Introduction' },
  { id: 'section-2', level: 2, title: 'Getting Started' },
  { id: 'section-3', level: 3, title: 'Advanced Usage' },
  { id: 'section-4', level: 1, title: 'Conclusion' },
];

describe('TableOfContents', () => {
  it('should render table of contents with items', async ({ TestWrapper }) => {
    render(
      <TestWrapper>
        <TableOfContents items={mockItems} />
      </TestWrapper>
    );

    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Advanced Usage')).toBeInTheDocument();
    expect(screen.getByText('Conclusion')).toBeInTheDocument();
  });

  it('should not render when no items are provided', async ({ TestWrapper }) => {
    const { container } = render(
      <TestWrapper>
        <TableOfContents items={[]} />
      </TestWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should apply correct indentation based on heading level', async ({ TestWrapper }) => {
    render(
      <TestWrapper>
        <TableOfContents items={mockItems} />
      </TestWrapper>
    );

    const level2Item = screen.getByText('Getting Started').closest('a');
    const level3Item = screen.getByText('Advanced Usage').closest('a');

    expect(level2Item).toHaveClass('ps-3');
    expect(level3Item).toHaveClass('ps-6');
  });

  it('should have proper accessibility attributes', async ({ TestWrapper }) => {
    render(
      <TestWrapper>
        <TableOfContents items={mockItems} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Table of contents navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Jump to section: Introduction')).toBeInTheDocument();
    expect(screen.getByLabelText('Jump to section: Getting Started')).toBeInTheDocument();
  });

  it('should render with custom className', async ({ TestWrapper }) => {
    const { container } = render(
      <TestWrapper>
        <TableOfContents className="custom-class" items={mockItems} />
      </TestWrapper>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
