import type { FC } from 'react';

import { BlogPostsErrorState } from '@shared/ui/ErrorStates';

/* -------------------------------------------------------------------------------------------------
 * ShardErrorState
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ShardErrorState';

interface ShardErrorStateProps {
  error: Error;
  onRetry: () => void;
  className?: string;
}

const ShardErrorState: FC<ShardErrorStateProps> = ({ error, onRetry, className }) => {
  return <BlogPostsErrorState className={className} error={error} onRetry={onRetry} />;
};

ShardErrorState.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShardErrorState };

export type { ShardErrorStateProps };
