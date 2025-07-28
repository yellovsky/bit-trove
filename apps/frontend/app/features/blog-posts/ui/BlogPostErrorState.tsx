import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

interface BlogPostErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export const BlogPostErrorState: FC<BlogPostErrorStateProps> = ({ error, onRetry, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      <div className="flex flex-col items-center justify-center py-12 text-center">
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
    </div>
  );
};
