import { SimpleGrid, Title } from '@mantine/core';
import type { FC } from 'react';

import { BlogPostCard } from '@features/blog-posts';

import { type GetManyBlogPostsVariables, useManyBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsPageProps {
  blogPostsVars: GetManyBlogPostsVariables;
}

export const BlogPostsPage: FC<BlogPostsPageProps> = ({ blogPostsVars }) => {
  const { data, fetchNextPage, hasNextPage } = useManyBlogPostsQuery(blogPostsVars);

  const blogPosts = data?.pages.flatMap((p) => p.data.items);

  return (
    <div>
      <Title order={1}>Blog</Title>
      <SimpleGrid cols={3}>
        {blogPosts?.map((blogPost) => (
          <BlogPostCard blogPost={blogPost} key={blogPost.id} />
        ))}
      </SimpleGrid>

      <button disabled={!hasNextPage} onClick={() => fetchNextPage()} type="button">
        load more
      </button>
      <br />
    </div>
  );
};
