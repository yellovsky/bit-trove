import type { FC } from 'react';

import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { type GetOneBlogPostVariables, useBlogPostQuery } from '@entities/blog-posts';

export const BlogPostPage: FC<{ blogPostVariables: GetOneBlogPostVariables }> = ({ blogPostVariables }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostResponse.data?.data;

  return (
    <div>
      <Heading order={1}>{blogPost?.title}</Heading>
      {blogPost?.contentJSON ? <PoseDocument doc={blogPost?.contentJSON} /> : null}
    </div>
  );
};
