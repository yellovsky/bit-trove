import { Title } from '@mantine/core';
import type { FC } from 'react';

import { EditorStatic } from '@widgets/editor';

import { type GetOneBlogPostVariables, useBlogPostQuery } from '@entities/blog-posts';

export const BlogPostPage: FC<{ blogPostVariables: GetOneBlogPostVariables }> = ({ blogPostVariables }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostResponse.data?.data;

  return (
    <div>
      <Title order={1}>{blogPost?.title}</Title>

      <EditorStatic content={blogPost?.contentJSON ?? ''} />
    </div>
  );
};
