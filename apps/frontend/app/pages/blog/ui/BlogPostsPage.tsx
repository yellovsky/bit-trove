import { keepPreviousData } from '@tanstack/query-core';
import { type ComponentProps, type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import type { FailedResponse, ShortBlogPost } from '@repo/api-models';
import { cn } from '@repo/ui/lib/utils';

import { BlogPostsErrorState, EmptyBlogPostsState } from '@shared/ui/ErrorStates';
import { SectionHeader } from '@shared/ui/SectionHeader';

import { BLOG_POSTS_NS, BlogPostGridCard, BlogPostGridCardPending, BlogSortingDropdown } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type ShortBlogPostsGetVariables, useInfiniteShortBlogPostsQuery } from '@entities/blog-posts';

type BlogPostCardsGridProps = ComponentProps<'div'>;
const BlogPostCardsGrid: FC<BlogPostCardsGridProps> = ({ className, ...rest }) => (
  <div className={cn('grid @2xl:grid-cols-2 @6xl:grid-cols-3 grid-cols-1 gap-4', className)} {...rest} />
);

/* -------------------------------------------------------------------------------------------------
 * BlogPostsPageView
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_PAGE_VIEW_NAME = 'BlogPostsPageView';

interface BlogPostsPageViewProps {
  breadcrumbs: AppBreadcrumb[];
  blogPosts: ShortBlogPost[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: FailedResponse | null;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onRetry: () => void;
  blogPostsVars: ShortBlogPostsGetVariables;
  ref: React.Ref<HTMLDivElement>;
}

const BlogPostsPageView: FC<BlogPostsPageViewProps> = ({
  breadcrumbs,
  blogPosts,
  isPending,
  isError,
  error,
  isFetchingNextPage,
  hasNextPage,
  onRetry,
  blogPostsVars,
  ref,
}) => {
  const { t } = useTranslation();
  const { t: blogPostsT } = useTranslation(BLOG_POSTS_NS);

  if (isError) {
    const errorMessage = error?.error?.message || 'An error occurred while loading blog posts';

    return (
      <output aria-live="polite" className="mx-auto max-w-7xl space-y-6">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />
        <SectionHeader
          action={<BlogSortingDropdown blogPostsVariables={blogPostsVars} />}
          className="mb-6"
          order={1}
          title={t('menu_items.blog.title')}
          titleId="blog-posts-heading"
        />
        <BlogPostsErrorState error={{ message: errorMessage } as Error} onRetry={onRetry} />
      </output>
    );
  }

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <output aria-live="polite" className="mx-auto max-w-7xl space-y-6">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />
        <SectionHeader
          action={<BlogSortingDropdown blogPostsVariables={blogPostsVars} />}
          className="mb-6"
          title={t('menu_items.blog.title')}
          titleId="blog-posts-heading"
        />
        <EmptyBlogPostsState />
      </output>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Breadcrumbs className="mb-6" items={breadcrumbs} />
      <SectionHeader
        action={<BlogSortingDropdown blogPostsVariables={blogPostsVars} />}
        className="mb-6"
        order={1}
        title={t('menu_items.blog.title')}
        titleId="blog-posts-heading"
      />
      <section aria-labelledby="blog-posts-heading" className="@container">
        <BlogPostCardsGrid>
          {blogPosts.map((blogPost) => (
            <BlogPostGridCard blogPost={blogPost} key={blogPost.id} />
          ))}

          {(isPending || isFetchingNextPage) &&
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            Array.from({ length: 6 }).map((_, index) => <BlogPostGridCardPending key={index} />)}
        </BlogPostCardsGrid>
      </section>

      {/* End of content indicator */}
      {!hasNextPage && blogPosts.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <div className="mb-2 font-mono text-sm">{blogPostsT('loading.end_of_content')}</div>
            <div className="text-xs">{blogPostsT('loading.no_more_posts')}</div>
          </div>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

BlogPostsPageView.displayName = BLOG_POSTS_PAGE_VIEW_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsPage
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_PAGE_NAME = 'BlogPostsPage';

interface BlogPostsPageProps {
  breadcrumbs: AppBreadcrumb[];
  blogPostsVars: ShortBlogPostsGetVariables;
}

const useBlogPostsPageData = (blogPostsVars: ShortBlogPostsGetVariables) => {
  const blogPostsQuery = useInfiniteShortBlogPostsQuery(blogPostsVars, { placeholderData: keepPreviousData });
  const blogPosts = blogPostsQuery.data?.pages.flatMap((p) => p.data.items);
  const { ref, entry } = useIntersectionObserver({ threshold: 0 });

  useEffect(() => {
    if (entry?.isIntersecting && !blogPostsQuery.isFetchingNextPage && blogPostsQuery.hasNextPage) {
      blogPostsQuery.fetchNextPage();
    }
  }, [
    entry?.isIntersecting,
    blogPostsQuery.hasNextPage,
    blogPostsQuery.isFetchingNextPage,
    blogPostsQuery.fetchNextPage,
  ]);

  return {
    blogPosts,
    error: blogPostsQuery.error,
    hasNextPage: blogPostsQuery.hasNextPage,
    isError: blogPostsQuery.isError,
    isFetchingNextPage: blogPostsQuery.isFetchingNextPage,
    isPending: blogPostsQuery.isPending,
    onRetry: () => blogPostsQuery.refetch(),
    ref,
  };
};

const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars, breadcrumbs }) => {
  const data = useBlogPostsPageData(blogPostsVars);
  return <BlogPostsPageView {...data} blogPostsVars={blogPostsVars} breadcrumbs={breadcrumbs} />;
};

BlogPostsPage.displayName = BLOG_POSTS_PAGE_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BlogPostsPage, BlogPostsPageView };
export type { BlogPostsPageProps, BlogPostsPageViewProps };
