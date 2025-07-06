import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import * as GridCardPrimitive from '@repo/ui/components/GridCard';
import { Skeleton } from '@repo/ui/components/Skeleton';

interface BlogPostCardSkeletonProps {
  className?: string;
}

export const BlogPostCardSkeleton: FC<BlogPostCardSkeletonProps> = ({ className }) => (
  <GridCardPrimitive.Root className={className}>
    <GridCardPrimitive.CardHeader>
      <GridCardPrimitive.CardHeaderContent>
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-24" />
      </GridCardPrimitive.CardHeaderContent>
      <Skeleton className="h-3 w-3 rounded-full" />
    </GridCardPrimitive.CardHeader>

    <GridCardPrimitive.CardContent>
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-2/3" />

      <GridCardPrimitive.CardFooter>
        <GridCardPrimitive.CardFooterGroup>
          <Skeleton className="h-3 w-16" />
        </GridCardPrimitive.CardFooterGroup>
        <Skeleton className="h-3 w-20" />
      </GridCardPrimitive.CardFooter>
    </GridCardPrimitive.CardContent>
  </GridCardPrimitive.Root>
);

interface BlogPostsLoadingStateProps {
  count?: number;
}

export const BlogPostsLoadingState: FC<BlogPostsLoadingStateProps> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <BlogPostCardSkeleton key={`blog-post-skeleton-${Math.random()}-${index}`} />
    ))}
  </div>
);

interface InfiniteScrollLoadingStateProps {
  className?: string;
}

export const InfiniteScrollLoadingState: FC<InfiniteScrollLoadingStateProps> = ({ className }) => {
  const { t } = useTranslation('blog_posts');

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center space-x-2 text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="text-sm">{t('loading.more_posts')}</span>
      </div>
    </div>
  );
};

interface EndOfContentStateProps {
  className?: string;
}

export const EndOfContentState: FC<EndOfContentStateProps> = ({ className }) => {
  const { t } = useTranslation('blog_posts');

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="text-center text-muted-foreground">
        <div className="mb-2 font-mono text-sm">{t('loading.end_of_content')}</div>
        <div className="text-xs">{t('loading.no_more_posts')}</div>
      </div>
    </div>
  );
};
