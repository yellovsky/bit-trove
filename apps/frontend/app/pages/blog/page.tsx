import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { BlogPostCard } from '@features/blog-posts';

import { type GetManyBlogPostsVariables, useManyBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsPageProps {
  blogPostsVars: GetManyBlogPostsVariables;
}

export const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const { data, fetchNextPage, hasNextPage } = useManyBlogPostsQuery(blogPostsVars);

  const blogPosts = data?.pages.flatMap((p) => p.data.items);

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

      <button disabled={!hasNextPage} onClick={() => fetchNextPage()} type="button">
        load more
      </button>
      <br />
    </div>
  );
};
