import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/link';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { BlogPostCard } from '@features/blog-posts';

import type { GetManyBlogPostsVariables } from '@entities/blog-posts';
import { useManyBlogPostsQuery } from '@entities/blog-posts';

interface BlogPostsSectionProps {
  blogPostsVars: GetManyBlogPostsVariables;
}

export const BlogPostsSection: FC<BlogPostsSectionProps> = ({ blogPostsVars }) => {
  const { t } = useTranslation();
  const query = useManyBlogPostsQuery(blogPostsVars);
  const blogPosts = query.data?.pages.at(0)?.data.items;

  return (
    <section aria-labelledby="blog-posts-heading">
      <SectionHeader
        action={
          <Button asChild size="sm" variant="dimmed">
            <Link to="/blog" variant="unstyled">
              {t('See all')}
            </Link>
          </Button>
        }
        className="mb-8"
        title={t('menu_items.blog.title')}
        titleId="blog-posts-heading"
      />

      <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-4">
        {blogPosts?.slice(0, 4).map((blogPost) => (
          <BlogPostCard blogPost={blogPost} key={blogPost.id} />
        ))}
      </div>
    </section>
  );
};
