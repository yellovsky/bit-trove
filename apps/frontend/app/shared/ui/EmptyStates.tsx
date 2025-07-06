import { BookOpenIcon, SearchIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';

interface NoBlogPostsStateProps {
  className?: string;
}

export const NoBlogPostsState: FC<NoBlogPostsStateProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <BookOpenIcon className="mb-4 h-12 w-12 text-muted-foreground" />
      <Heading className="mb-2" order={2}>
        No blog posts found
      </Heading>
      <p className="mb-6 text-muted-foreground">{t('no_results_found')}</p>
    </div>
  );
};

interface NoSearchResultsStateProps {
  searchTerm?: string;
  onClearSearch?: () => void;
  className?: string;
}

export const NoSearchResultsState: FC<NoSearchResultsStateProps> = ({ searchTerm, onClearSearch, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <SearchIcon className="mb-4 h-12 w-12 text-muted-foreground" />
      <Heading className="mb-2" order={2}>
        No results found
      </Heading>
      <p className="mb-6 text-muted-foreground">
        {searchTerm ? `No blog posts found for "${searchTerm}"` : t('no_results_found')}
      </p>
      {onClearSearch && (
        <Button onClick={onClearSearch} variant="outline">
          Clear search
        </Button>
      )}
    </div>
  );
};

interface ComingSoonStateProps {
  className?: string;
}

export const ComingSoonState: FC<ComingSoonStateProps> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl">🚀</span>
      </div>
      <Heading className="mb-2" order={2}>
        Coming Soon
      </Heading>
      <p className="text-muted-foreground">We're working on some great content. Check back soon!</p>
    </div>
  );
};
