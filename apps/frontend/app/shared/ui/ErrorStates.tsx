import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * BlogPostsErrorState
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_ERROR_STATE_NAME = 'BlogPostsErrorState';

type BlogPostsErrorStateProps = {
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
};

const BlogPostsErrorState: FC<BlogPostsErrorStateProps> = ({ error, onRetry, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <AlertCircleIcon className="mb-4 h-12 w-12 text-destructive" />
      <Heading className="mb-2" order={2}>
        {t('error_loading_data')}
      </Heading>
      <p className="mb-6 text-muted-foreground">{error?.message || t('error.unknown_error.description')}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          {t('error_page.500.button_text')}
        </Button>
      )}
    </div>
  );
};

BlogPostsErrorState.displayName = BLOG_POSTS_ERROR_STATE_NAME;

/* -------------------------------------------------------------------------------------------------
 * EmptyBlogPostsState
 * -----------------------------------------------------------------------------------------------*/
const EMPTY_BLOG_POSTS_STATE_NAME = 'EmptyBlogPostsState';

type EmptyBlogPostsStateProps = {
  className?: string;
};

const EmptyBlogPostsState: FC<EmptyBlogPostsStateProps> = ({ className }) => {
  const { t } = useTranslation('blog_posts');

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <Heading className="mb-2" order={2}>
        {t('empty.title')}
      </Heading>
      <p className="text-muted-foreground">{t('empty.description')}</p>
    </div>
  );
};

EmptyBlogPostsState.displayName = EMPTY_BLOG_POSTS_STATE_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BlogPostsErrorState, EmptyBlogPostsState };

export type { BlogPostsErrorStateProps, EmptyBlogPostsStateProps };
