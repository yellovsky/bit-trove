import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { ShortBlogPostsGetVariables } from '@entities/blog-posts';

import { BlogSortingDropdown } from './BlogSortingDropdown';

// Mock react-router
vi.mock('react-router', () => ({
  useSearchParams: () => [new URLSearchParams('?sort=-createdAt'), vi.fn()],
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common:select_sort': 'Select sort order',
        'Sort by:': 'Sort by:',
        'sort.newest': 'Newest first',
        'sort.oldest': 'Oldest first',
      };
      return translations[key] || key;
    },
  }),
}));

describe('BlogSortingDropdown', () => {
  const mockBlogPostsVariables: ShortBlogPostsGetVariables = {
    filter: {
      typeIn: ['blog_post'],
    },
    locale: 'en',
    sort: '-createdAt' as const,
  };

  it('renders the sorting dropdown with correct label', ({ TestWrapper }) => {
    render(<BlogSortingDropdown blogPostsVariables={mockBlogPostsVariables} />, { wrapper: TestWrapper });

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('displays the current sort value', ({ TestWrapper }) => {
    render(<BlogSortingDropdown blogPostsVariables={mockBlogPostsVariables} />, { wrapper: TestWrapper });

    expect(screen.getByText('Newest first')).toBeInTheDocument();
  });

  it('shows both sort options', ({ TestWrapper }) => {
    render(<BlogSortingDropdown blogPostsVariables={mockBlogPostsVariables} />, { wrapper: TestWrapper });

    // Open the dropdown to see options
    const trigger = screen.getByRole('combobox');
    act(() => {
      trigger.click();
    });

    // Check that both options are available in the dropdown
    expect(screen.getAllByText('Newest first')).toHaveLength(2); // One in trigger, one in dropdown
    expect(screen.getByText('Oldest first')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', ({ TestWrapper }) => {
    render(<BlogSortingDropdown blogPostsVariables={mockBlogPostsVariables} />, { wrapper: TestWrapper });

    const label = screen.getByText('Sort by:');
    const select = screen.getByRole('combobox');

    expect(label).toHaveAttribute('for', select.id);
  });
});
