import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { type ShortArticlesGetSort, shortArticlesGetSortSchema } from '@repo/api-models';

export type BlogPostSortOption = ShortArticlesGetSort;

export const BLOG_POST_SORT_OPTIONS = [
  { label: 'sort.newest_first', value: '-createdAt' },
  { label: 'sort.oldest_first', value: 'createdAt' },
  { label: 'sort.recently_published', value: '-publishedAt' },
  { label: 'sort.oldest_published', value: 'publishedAt' },
  { label: 'sort.title_az', value: 'title' },
  { label: 'sort.title_za', value: '-title' },
] as const satisfies Array<{ value: BlogPostSortOption; label: string }>;

export const DEFAULT_BLOG_POST_SORT: BlogPostSortOption = '-createdAt';

export const useBlogPostSorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = useMemo(() => {
    const urlSort = searchParams.get('sort');
    return shortArticlesGetSortSchema.safeParse(urlSort).data || DEFAULT_BLOG_POST_SORT;
  }, [searchParams]);

  const setSort = useCallback(
    (sort: BlogPostSortOption) => {
      setSearchParams(
        (prev) => {
          prev.set('sort', sort);
          // Reset to first page when sorting changes
          prev.delete('page');
          return prev;
        },
        { preventScrollReset: true }
      );
    },
    [setSearchParams]
  );

  return {
    currentSort,
    setSort,
  };
};
