import { ChevronDown } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/DropdownMenu';

import { BLOG_POST_SORT_OPTIONS, useBlogPostSorting } from '../lib/sorting';

interface SortControlsProps {
  className?: string;
}

export const SortControls: FC<SortControlsProps> = ({ className }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');
  const { currentSort, setSort } = useBlogPostSorting();

  const currentOption = BLOG_POST_SORT_OPTIONS.find((option) => option.value === currentSort);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="listbox" aria-label={tBlogPosts('sort.label')} className={className} variant="outline">
          <span className="mr-2">{tBlogPosts('sort.label')}</span>
          {currentOption && <span className="mr-2">{tBlogPosts(currentOption.label)}</span>}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {BLOG_POST_SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className={currentSort === option.value ? 'bg-accent' : ''}
            key={option.value}
            onClick={() => setSort(option.value)}
          >
            {tBlogPosts(option.label)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
