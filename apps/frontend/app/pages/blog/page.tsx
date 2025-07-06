import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { Heading } from '@repo/ui/components/Typography';

import { BlogPostsErrorState, EmptyBlogPostsState } from '@shared/ui/ErrorStates';
import { BlogPostsLoadingState, EndOfContentState, InfiniteScrollLoadingState } from '@shared/ui/LoadingStates';

import { BlogPostCard, SortControls } from '@features/blog-posts';
import { useBlogPostSorting } from '@features/blog-posts/lib/sorting';

import { type GetManyBlogPostsVariables, useManyBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsPageProps {
  blogPostsVars: GetManyBlogPostsVariables;
}

export const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const { currentSort } = useBlogPostSorting();

  // Update the query variables with the current sort
  const updatedBlogPostsVars = {
    ...blogPostsVars,
    sort: currentSort,
  };

  const blogPostsQuery = useManyBlogPostsQuery(updatedBlogPostsVars);

  const blogPosts = blogPostsQuery.data?.pages.flatMap((p) => p.data.items);

  const { ref, entry } = useIntersectionObserver({ threshold: 0 });

  useEffect(() => {
    if (entry?.isIntersecting && !blogPostsQuery.isFetchingNextPage && blogPostsQuery.hasNextPage)
      blogPostsQuery.fetchNextPage();
  }, [
    entry?.isIntersecting,
    blogPostsQuery.hasNextPage,
    blogPostsQuery.isFetchingNextPage,
    blogPostsQuery.fetchNextPage,
  ]);

  // Handle loading state
  if (blogPostsQuery.isPending) {
    return (
      <output aria-live="polite" className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <Heading className="mb-6" id="blog-posts-heading" order={1}>
            {t('menu_items.blog.title')}
          </Heading>
          <SortControls />
        </div>
        <BlogPostsLoadingState />
      </output>
    );
  }

  // Handle error state
  if (blogPostsQuery.isError) {
    const errorMessage = blogPostsQuery.error?.error?.message || 'An error occurred while loading blog posts';
    return (
      <output aria-live="polite" className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <Heading className="mb-6" id="blog-posts-heading" order={1}>
            {t('menu_items.blog.title')}
          </Heading>
          <SortControls />
        </div>
        <BlogPostsErrorState error={{ message: errorMessage } as Error} onRetry={() => blogPostsQuery.refetch()} />
      </output>
    );
  }

  // Handle empty state
  if (!blogPosts || blogPosts.length === 0) {
    return (
      <output aria-live="polite" className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <Heading className="mb-6" id="blog-posts-heading" order={1}>
            {t('menu_items.blog.title')}
          </Heading>
          <SortControls />
        </div>
        <EmptyBlogPostsState />
      </output>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <Heading className="mb-6" id="blog-posts-heading" order={1}>
          {t('menu_items.blog.title')}
        </Heading>
        <SortControls />
      </div>
      <section aria-labelledby="blog-posts-heading" className="@container">
        <ul className="grid @2xl:grid-cols-3 @4xl:grid-cols-4 @md:grid-cols-2 grid-cols-1 gap-4">
          {blogPosts.map((blogPost) => (
            <li className="contents" key={blogPost.id}>
              <BlogPostCard blogPost={blogPost} />
            </li>
          ))}
        </ul>
      </section>
      {/* Infinite scroll loading indicator */}
      {blogPostsQuery.isFetchingNextPage && <InfiniteScrollLoadingState />}
      {/* End of content indicator */}
      {!blogPostsQuery.hasNextPage && blogPosts.length > 0 && <EndOfContentState />}
      <div ref={ref} />
    </div>
  );
};
