import type { FC } from 'react';

import { Skeleton } from '@repo/ui/components/Skeleton';

interface BlogPostDetailSkeletonProps {
  className?: string;
}

export const BlogPostDetailSkeleton: FC<BlogPostDetailSkeletonProps> = ({ className }) => (
  <div className={`mx-auto max-w-4xl ${className}`}>
    {/* Breadcrumbs skeleton */}
    <div className="mb-6 flex items-center space-x-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-32" />
    </div>

    {/* Header skeleton */}
    <div className="mb-8">
      <Skeleton className="mb-4 h-8 w-3/4" />
      <Skeleton className="mb-6 h-6 w-1/2" />

      {/* Metadata skeleton */}
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <Skeleton className="mb-4 h-6 w-full" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-4/5" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-4/5" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
    </div>

    {/* Tags skeleton */}
    <div className="mt-8 flex flex-wrap gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
      <Skeleton className="h-6 w-18 rounded-full" />
    </div>
  </div>
);
