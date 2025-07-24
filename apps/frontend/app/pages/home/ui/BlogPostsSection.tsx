import { keepPreviousData } from '@tanstack/query-core';
import { ArrowRightIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortBlogPost } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { BLOG_POSTS_NS, BlogPostListCard, BlogPostListCardPending } from '@features/blog-posts';

import { type ShortBlogPostsGetVariables, useInfiniteShortBlogPostsQuery } from '@entities/blog-posts';

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSectionEmpty
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_EMPTY_NAME = 'BlogPostsSectionEmpty';

const BlogPostsSectionEmpty: FC = () => {
  const { t: blogPostsT } = useTranslation(BLOG_POSTS_NS);

  return <div className="py-8 text-center text-muted-foreground">{blogPostsT('No blog posts found')}</div>;
};

BlogPostsSectionEmpty.displayName = BLOG_POSTS_SECTION_EMPTY_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSectionError
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_ERROR_NAME = 'BlogPostsSectionError';

const BlogPostsSectionError: FC<{ error: unknown }> = ({ error }) => {
  const { t: blogPostsT } = useTranslation(BLOG_POSTS_NS);

  return (
    <div className="py-8 text-center text-destructive">
      {typeof error === 'string' ? error : blogPostsT('Failed to load blog posts')}
    </div>
  );
};

BlogPostsSectionError.displayName = BLOG_POSTS_SECTION_ERROR_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSectionPending
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_PENDING_NAME = 'BlogPostsSectionPending';

const BlogPostsSectionPending: FC = () => (
  <div className="grid grid-cols-1 gap-4">
    <BlogPostListCardPending />
    <BlogPostListCardPending />
    <BlogPostListCardPending />
    <BlogPostListCardPending />
  </div>
);

BlogPostsSectionPending.displayName = BLOG_POSTS_SECTION_PENDING_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSectionContent
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_CONTENT_NAME = 'BlogPostsSectionContent';

interface BlogPostsSectionContentProps {
  blogPosts?: ShortBlogPost[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

const BlogPostsSectionContent: FC<BlogPostsSectionContentProps> = ({ blogPosts, isPending, isError, error }) => {
  if (isError) return <BlogPostsSectionError error={error} />;
  if (isPending) return <BlogPostsSectionPending />;
  if (!blogPosts || blogPosts.length === 0) return <BlogPostsSectionEmpty />;

  return (
    <div className="grid grid-cols-1 gap-4">
      {blogPosts.slice(0, 4).map((blogPost) => (
        <BlogPostListCard blogPost={blogPost} key={blogPost.id} />
      ))}
    </div>
  );
};

BlogPostsSectionContent.displayName = BLOG_POSTS_SECTION_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSectionView
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_VIEW_NAME = 'BlogPostsSectionView';

export interface BlogPostsSectionViewProps {
  blogPosts?: ShortBlogPost[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

const BlogPostsSectionView: FC<BlogPostsSectionViewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="blog-posts-heading">
      <SectionHeader
        action={
          <Button asChild variant="ghost">
            <Link to="/blog">
              {t('See all')}
              <ArrowRightIcon />
            </Link>
          </Button>
        }
        className="mb-4"
        title={t('menu_items.blog.title')}
        titleId="blog-posts-heading"
      />
      <BlogPostsSectionContent {...props} />
    </section>
  );
};

BlogPostsSectionView.displayName = BLOG_POSTS_SECTION_VIEW_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostsSection (container)
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POSTS_SECTION_NAME = 'BlogPostsSection';

const useBlogPostsSectionData = (variables: ShortBlogPostsGetVariables) => {
  const query = useInfiniteShortBlogPostsQuery(variables, { placeholderData: keepPreviousData });
  const blogPosts = query.data?.pages.at(0)?.data.items;

  return {
    blogPosts,
    error: query.error,
    isError: query.isError,
    isPending: query.isPending,
  };
};

export interface BlogPostsSectionProps {
  blogPostsVars: ShortBlogPostsGetVariables;
}

const BlogPostsSection: FC<BlogPostsSectionProps> = ({ blogPostsVars }) => {
  const { blogPosts, isPending, isError, error } = useBlogPostsSectionData(blogPostsVars);

  return <BlogPostsSectionView blogPosts={blogPosts} error={error} isError={isError} isPending={isPending} />;
};

BlogPostsSection.displayName = BLOG_POSTS_SECTION_NAME;

export { BlogPostsSection, BlogPostsSectionView };
