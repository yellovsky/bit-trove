import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { Heading } from '@repo/ui/components/Typography';

import { BlogPostCard } from '@features/blog-posts';

import { type GetManyBlogPostsVariables, useManyBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsPageProps {
  blogPostsVars: GetManyBlogPostsVariables;
}

export const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const blogPostsQuery = useManyBlogPostsQuery(blogPostsVars);

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

  return (
    <div>
      <Heading className="mb-4" order={1}>
        {t('menu_items.blog.title')}
      </Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts?.map((blogPost) => (
          <BlogPostCard blogPost={blogPost} key={blogPost.id} />
        ))}
      </div>

      <div ref={ref} />
    </div>
  );
};
