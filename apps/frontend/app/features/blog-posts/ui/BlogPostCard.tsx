import type { FC } from 'react';

import type { ShortBlogPost } from '@repo/api-models';

import { ArticleListCard } from '@features/articles';

import { getBlogPostLink } from '../lib/links';

interface BlogPostCardProps {
  blogPost: ShortBlogPost;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({ blogPost }) => (
  <ArticleListCard article={blogPost} to={getBlogPostLink(blogPost)} />
);
