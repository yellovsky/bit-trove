import { ArrowLeftIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { BlogPost, FailedResponse } from '@repo/api-models';
import { Link } from '@repo/ui/components/Link';

import { ErrorScreen } from '@shared/ui/ErrorScreen';
import { ReadingProgress } from '@shared/ui/ReadingProgress';

import { ArticlePageContent, type ArticlePageContentProps } from '@features/articles';
import { ArticlePageContentLoading } from '@features/articles/ui/ArticlePageContent';
import { BLOG_POSTS_NS, getBlogPostsLink } from '@features/blog-posts';
import type { AppBreadcrumb } from '@features/breadcrumbs';

import { type BlogPostGetVariables, useBlogPostQuery } from '@entities/blog-posts';

/* -------------------------------------------------------------------------------------------------
 * BlogPostPageNotFound
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_NOT_FOUND_NAME = 'BlogPostPageNotFound';

const BlogPostPageNotFound: FC = () => {
  const { t } = useTranslation();
  const { t: tBlogPosts } = useTranslation(BLOG_POSTS_NS);

  return (
    <>
      <ReadingProgress />
      <ErrorScreen
        button={
          <Link to={getBlogPostsLink()}>
            <ArrowLeftIcon />
            <span>{tBlogPosts('Back to blog')}</span>
          </Link>
        }
        code={404}
        subtitle={t('error_page.404.subtitle')}
        title={t('error_page.404.title')}
      />
    </>
  );
};

BlogPostPageNotFound.displayName = BLOG_POST_PAGE_NOT_FOUND_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostPageError
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_ERROR_NAME = 'BlogPostPageError';

type BlogPostPageErrorStateProps = {
  error?: FailedResponse;
};

const BlogPostPageErrorState: FC<BlogPostPageErrorStateProps> = ({ error }) => {
  const { t } = useTranslation();

  if (error?.error?.httpCode === 404) return <BlogPostPageNotFound />;

  return (
    <>
      <ReadingProgress />
      <ErrorScreen code={500} subtitle={t('error_page.500.subtitle')} title={t('error_page.500.title')} />
    </>
  );
};

BlogPostPageErrorState.displayName = BLOG_POST_PAGE_ERROR_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostPageLoading
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_LOADING_NAME = 'BlogPostPageLoading';

const BlogPostPageLoading: FC = (props) => <ArticlePageContentLoading {...props} />;

BlogPostPageLoading.displayName = BLOG_POST_PAGE_LOADING_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostPageContent
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_CONTENT_NAME = 'BlogPostPageContent';

type BlogPostPageContentProps = ArticlePageContentProps;

const BlogPostPageContent: FC<BlogPostPageContentProps> = (props) => <ArticlePageContent {...props} />;

BlogPostPageContent.displayName = BLOG_POST_PAGE_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostPageView
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_VIEW_NAME = 'BlogPostPageView';

interface BlogPostPageViewProps {
  blogPost: BlogPost | null | undefined;
  breadcrumbs: AppBreadcrumb[];
  error: FailedResponse | null | undefined;
  pending: boolean;
}

const BlogPostPageView: FC<BlogPostPageViewProps> = ({ blogPost, breadcrumbs, error, pending }) => {
  if (pending) return <BlogPostPageLoading />;
  if (error) return <BlogPostPageErrorState error={error} />;
  if (!blogPost) return <BlogPostPageNotFound />;
  return <BlogPostPageContent article={blogPost} breadcrumbs={breadcrumbs} />;
};

BlogPostPageView.displayName = BLOG_POST_PAGE_VIEW_NAME;

/* -------------------------------------------------------------------------------------------------
 * BlogPostPage
 * -----------------------------------------------------------------------------------------------*/
const BLOG_POST_PAGE_NAME = 'BlogPostPage';

interface BlogPostPageProps {
  blogPostVariables: BlogPostGetVariables;
  breadcrumbs: AppBreadcrumb[];
}

const BlogPostPage: FC<BlogPostPageProps> = ({ blogPostVariables, breadcrumbs }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);

  return (
    <BlogPostPageView
      blogPost={blogPostResponse.data?.data}
      breadcrumbs={breadcrumbs}
      error={blogPostResponse.error}
      pending={blogPostResponse.isPending}
    />
  );
};

BlogPostPage.displayName = BLOG_POST_PAGE_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = BlogPostPage;
const Content = BlogPostPageContent;
const Loading = BlogPostPageLoading;
const ErrorState = BlogPostPageErrorState;
const View = BlogPostPageView;
const NotFound = BlogPostPageNotFound;

export {
  Root,
  Content,
  Loading,
  ErrorState,
  View,
  NotFound,
  //
  BlogPostPage,
  BlogPostPageContent,
  BlogPostPageLoading,
  BlogPostPageErrorState,
  BlogPostPageView,
  BlogPostPageNotFound,
};

export type { BlogPostPageProps, BlogPostPageContentProps, BlogPostPageViewProps };
