import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';

interface BlogPostsErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export const BlogPostsErrorState: FC<BlogPostsErrorStateProps> = ({ error, onRetry, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
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

interface EmptyBlogPostsStateProps {
  className?: string;
}

export const EmptyBlogPostsState: FC<EmptyBlogPostsStateProps> = ({ className }) => {
  const { t } = useTranslation('blog_posts');

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl">📝</span>
      </div>
      <Heading className="mb-2" order={2}>
        {t('empty.title')}
      </Heading>
      <p className="text-muted-foreground">{t('empty.description')}</p>
    </div>
  );
};

interface NetworkErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkErrorState: FC<NetworkErrorStateProps> = ({ onRetry, className }) => {
  const { t } = useTranslation('blog_posts');

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <AlertCircleIcon className="mb-4 h-12 w-12 text-destructive" />
      <Heading className="mb-2" order={2}>
        {t('network_error.title')}
      </Heading>
      <p className="mb-6 text-muted-foreground">{t('network_error.description')}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          {t('network_error.try_again')}
        </Button>
      )}
    </div>
  );
};
