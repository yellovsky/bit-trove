import type { FC } from 'react';

import type { ShortBlogPost } from '@repo/api-models';
import { Switch } from '@repo/ui/components/Switch';

import { usePublishBlogPostMutation, useUnpublishBlogPostMutation } from '@entities/blog-posts';

interface BlogPostPublishSwitchProps {
  blogPost: ShortBlogPost;
}

export const BlogPostPublishSwitch: FC<BlogPostPublishSwitchProps> = ({ blogPost }) => {
  const { mutate: publishBlogPost } = usePublishBlogPostMutation();
  const { mutate: unpublishBlogPost } = useUnpublishBlogPostMutation();

  return (
    <Switch
      checked={!!blogPost.publishedAt}
      onClick={() => {
        if (blogPost.publishedAt) unpublishBlogPost(blogPost.id);
        else publishBlogPost(blogPost.id);
      }}
    />
  );
};
