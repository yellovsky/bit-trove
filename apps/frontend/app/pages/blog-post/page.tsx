import { Title } from '@mantine/core';
import type { FC } from 'react';

import { PoseDocument } from '@repo/ui/components/PoseDocument';

import { type GetOneBlogPostVariables, useBlogPostQuery } from '@entities/blog-posts';

export const BlogPostPage: FC<{ blogPostVariables: GetOneBlogPostVariables }> = ({ blogPostVariables }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostResponse.data?.data;

  return (
    <div>
      <Title order={1}>{blogPost?.title}</Title>
      {blogPost?.contentJSON ? <PoseDocument doc={blogPost?.contentJSON} /> : null}
    </div>
  );
};
