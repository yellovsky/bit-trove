import type { FC } from 'react';

import type { GetManyBlogPostsVariables } from '@entities/blog-posts';
import type { GetManyShardsVariables } from '@entities/shards';

import { BlogPostsSection } from './BlogPostsSection';
import { ShardsSection } from './ShardsSection';

interface HomePageProps {
  shardsVariables: GetManyShardsVariables;
  blogPostsVariables: GetManyBlogPostsVariables;
}

export const HomePage: FC<HomePageProps> = ({ shardsVariables, blogPostsVariables }) => (
  <div className="mx-auto max-w-7xl space-y-12">
    <ShardsSection variables={shardsVariables} />
    <BlogPostsSection blogPostsVars={blogPostsVariables} />
  </div>
);
