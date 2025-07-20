import type { FC } from 'react';

import type { ShortBlogPost } from '@repo/api-models';

import { ArticleGridCard, ArticleGridCardPending, ArticleListCard, ArticleListCardPending } from '@features/articles';

import { getBlogPostLink } from '../lib/links';

interface BlogPostCardProps {
  blogPost: ShortBlogPost;
}

export const BlogPostListCard: FC<BlogPostCardProps> = ({ blogPost }) => (
  <ArticleListCard article={blogPost} to={getBlogPostLink(blogPost)} />
);

export const BlogPostListCardPending: FC = () => <ArticleListCardPending />;

export const BlogPostGridCard: FC<BlogPostCardProps> = ({ blogPost }) => (
  <ArticleGridCard article={blogPost} to={getBlogPostLink(blogPost)} />
);

export const BlogPostGridCardPending: FC = () => <ArticleGridCardPending />;
