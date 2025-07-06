import type { FC } from 'react';

import { useMainContentScroll } from './MainContentScroll';

interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: FC<ReadingProgressProps> = ({ className = '' }) => {
  const progress = useMainContentScroll();

  return (
    <div
      aria-label="Reading progress"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      className={`fixed top-0 left-0 z-50 h-1 w-full bg-muted ${className}`}
      role="progressbar"
    >
      <div className="h-full bg-primary transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};
