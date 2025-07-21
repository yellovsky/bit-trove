import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { BlogPostsErrorState, EmptyBlogPostsState } from '@shared/ui/ErrorStates';
import { BlogPostsLoadingState, EndOfContentState, InfiniteScrollLoadingState } from '@shared/ui/LoadingStates';
import { SectionHeader } from '@shared/ui/SectionHeader';

import { BlogPostGridCard, BlogSortingDropdown } from '@features/blog-posts';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type ShortBlogPostsGetVariables, useInfiniteShortBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsPageProps {
  blogPostsVars: ShortBlogPostsGetVariables;
}

export const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const blogPostsQuery = useInfiniteShortBlogPostsQuery(blogPostsVars);
  const blogPosts = blogPostsQuery.data?.pages.flatMap((p) => p.data.items);
  const { ref, entry } = useIntersectionObserver({ threshold: 0 });

  // Breadcrumbs: Home → Blog
  const breadcrumbs: AppBreadcrumb[] = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.blog.title'), to: '/blog' },
  ];

  useEffect(() => {
    if (entry?.isIntersecting && !blogPostsQuery.isFetchingNextPage && blogPostsQuery.hasNextPage)
      blogPostsQuery.fetchNextPage();
  }, [
    entry?.isIntersecting,
    blogPostsQuery.hasNextPage,
    blogPostsQuery.isFetchingNextPage,
    blogPostsQuery.fetchNextPage,
  ]);

  // Loading state
  if (blogPostsQuery.isPending) {
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
        <BlogPostsLoadingState />
      </output>
    );
  }

  // Error state
  if (blogPostsQuery.isError) {
    const errorMessage = blogPostsQuery.error?.error?.message || 'An error occurred while loading blog posts';
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
        <BlogPostsErrorState error={{ message: errorMessage } as Error} onRetry={() => blogPostsQuery.refetch()} />
      </output>
    );
  }

  // Empty state
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
        <ul className="grid @2xl:grid-cols-3 @4xl:grid-cols-4 @md:grid-cols-2 grid-cols-1 gap-4">
          {blogPosts.map((blogPost) => (
            <li className="contents" key={blogPost.id}>
              <BlogPostGridCard blogPost={blogPost} />
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
