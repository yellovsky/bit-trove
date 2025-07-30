import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { Component as ReactComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * ErrorBoundary
 * -----------------------------------------------------------------------------------------------*/
const ERROR_BOUNDARY_NAME = 'ErrorBoundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends ReactComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  static displayName = ERROR_BOUNDARY_NAME;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    return this.state.hasError ? this.props.fallback || null : this.props.children;
  }
}

/* -------------------------------------------------------------------------------------------------
 * ErrorBoundaryFallback
 * -----------------------------------------------------------------------------------------------*/
const ERROR_BOUNDARY_FALLBACK_NAME = 'ErrorBoundaryFallback';

interface ErrorBoundaryFallbackProps {
  error?: Error;
  className?: string;
}

const ErrorBoundaryFallback: FC<ErrorBoundaryFallbackProps> = ({ error, className }) => {
  const { t } = useTranslation();

  const handleRetry = () => window.location.reload();

  return (
    <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
      <AlertCircleIcon className="mb-4 h-8 w-8 text-destructive" />
      <Heading className="mb-2" order={3}>
        {t('error_loading_data')}
      </Heading>
      <p className="mb-4 text-muted-foreground text-sm">{error?.message || t('error.unknown_error.description')}</p>
      <Button onClick={handleRetry} size="sm" variant="outline">
        <RefreshCwIcon className="mr-2 h-4 w-4" />
        {t('error_page.500.button_text')}
      </Button>
    </div>
  );
};

ErrorBoundaryFallback.displayName = ERROR_BOUNDARY_FALLBACK_NAME;

export { ErrorBoundaryClass as ErrorBoundary };
export type { ErrorBoundaryProps };
