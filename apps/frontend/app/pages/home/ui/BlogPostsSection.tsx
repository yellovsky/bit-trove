import { keepPreviousData } from '@tanstack/query-core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { BlogPostListCard } from '@features/blog-posts';

import { type ShortBlogPostsGetVariables, useInfiniteShortBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsSectionProps {
  blogPostsVars: ShortBlogPostsGetVariables;
}

export const BlogPostsSection: FC<BlogPostsSectionProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const query = useInfiniteShortBlogPostsQuery(blogPostsVars, { placeholderData: keepPreviousData });
  const blogPosts = query.data?.pages.at(0)?.data.items;

  return (
    <section aria-labelledby="blog-posts-heading">
      <SectionHeader
        action={
          <Button asChild variant="ghost">
            <Link to="/blog">{t('See all')}</Link>
          </Button>
        }
        className="mb-8"
        title={t('menu_items.blog.title')}
        titleId="blog-posts-heading"
      />

      <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-4">
        {blogPosts?.slice(0, 4).map((blogPost) => (
          <BlogPostListCard blogPost={blogPost} key={blogPost.id} />
        ))}
      </div>
    </section>
  );
};
