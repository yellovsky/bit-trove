import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SortControls } from './SortControls';

// Mock the sorting hook
vi.mock('../lib/sorting', () => ({
  BLOG_POST_SORT_OPTIONS: [
    { label: 'sort.newest_first', value: '-createdAt' },
    { label: 'sort.oldest_first', value: 'createdAt' },
  ],
  useBlogPostSorting: () => ({
    currentSort: '-createdAt',
    setSort: vi.fn(),
  }),
}));

describe('SortControls', () => {
  it('renders sort controls with current sort option', ({ TestWrapper }) => {
    render(<SortControls />, { wrapper: TestWrapper });

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Newest first')).toBeInTheDocument();
  });
});
