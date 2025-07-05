import type { FC } from 'react';

import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { DateLabelIcon, ReadingTimeLabelIcon } from '@shared/ui/LabeledIcon';

import { type GetOneBlogPostVariables, useBlogPostQuery } from '@entities/blog-posts';

export const BlogPostPage: FC<{ blogPostVariables: GetOneBlogPostVariables }> = ({ blogPostVariables }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostResponse.data?.data;

  return (
    <div>
      <Heading order={1}>{blogPost?.title}</Heading>

      <div className="mt-md flex items-center gap-4">
        {blogPost?.createdAt && <DateLabelIcon date={blogPost.createdAt} />}
        {blogPost?.readingTime && <ReadingTimeLabelIcon minutes={blogPost.readingTime} />}
      </div>

      {blogPost?.contentJSON ? <PoseDocument doc={blogPost?.contentJSON} /> : null}
    </div>
  );
};
