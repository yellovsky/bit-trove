import slugify from '@sindresorhus/slugify';
import type { FC } from 'react';

import type { Article } from '@repo/api-models';
import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Skeleton } from '@repo/ui/components/Skeleton';
import { Heading } from '@repo/ui/components/Typography';

import { ContentWithSidebar } from '@shared/ui/ContentWithSidebar';
import { ReadingProgress } from '@shared/ui/ReadingProgress';

import { ArticleMetadata, RelatedArticles } from '@features/articles';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { BreadcrumbsPending } from '@features/breadcrumbs/ui/Breadcrumbs';

import { ArticleTableOfContents } from './ArticleTableOfContents';

/* -------------------------------------------------------------------------------------------------
 * ArticlePageContentLoading
 * -----------------------------------------------------------------------------------------------*/
const ARTICLE_PAGE_CONTENT_LOADING_NAME = 'ArticlePageContentLoading';

const ArticlePageContentLoading: FC = () => {
  return (
    <>
      <ReadingProgress />
      {/* TODO add pending skeleton */}
      <ContentWithSidebar>
        <BreadcrumbsPending className="mb-7" />
        <Skeleton className="mb-8 h-8 w-full" />

        <div className="mb-6 flex gap-4">
          <Skeleton className="h-5 w-30" />
          <Skeleton className="h-5 w-30" />
        </div>

        <div className="mb-8 flex gap-4">
          <Skeleton className="h-5 w-15" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-30" />
        </div>

        <Skeleton className="mb-5 h-8 w-45" />
        <Skeleton className="mb-2 h-4 w-[85%]" />
        <Skeleton className="mb-2 h-4 w-[75%]" />
        <Skeleton className="mb-2 h-4 w-[90%]" />
        <Skeleton className="mb-2 h-4 w-[65%]" />
      </ContentWithSidebar>
    </>
  );
};

ArticlePageContentLoading.displayName = ARTICLE_PAGE_CONTENT_LOADING_NAME;

/* -------------------------------------------------------------------------------------------------
 * ArticlePageContent
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ArticlePageContent';

interface ArticlePageContentProps {
  breadcrumbs: AppBreadcrumb[];
  article: Article;
}

const ArticlePageContent: FC<ArticlePageContentProps> = ({ article, breadcrumbs }) => {
  const sidebar = (
    <>
      <ArticleTableOfContents article={article} />
      {article?.id && <RelatedArticles articleId={article.id} />}
    </>
  );

  return (
    <>
      {/* Reading progress indicator */}
      <ReadingProgress />

      <ContentWithSidebar sidebar={sidebar}>
        {/* Navigation section */}
        <Breadcrumbs className="mb-6" items={breadcrumbs} />

        <article aria-labelledby="blog-post-title">
          {/* Blog post header */}
          <header className="mb-8">
            <Heading className="mb-6 text-balance" id={slugify(article?.title ?? '')} order={1}>
              {article.title}
            </Heading>

            <ArticleMetadata publishedAt={article.publishedAt} readingTime={article.readingTime} tags={article.tags} />
          </header>

          {/* Blog post content */}
          {article.contentJSON ? (
            <PoseDocument doc={article.contentJSON} />
          ) : (
            <output aria-live="polite" className="py-12 text-center">
              <p className="text-muted-foreground">No content available for this blog post.</p>
            </output>
          )}
        </article>

        {/* Related articles at the bottom */}
        <RelatedArticles articleId={article.id} className="border-t pt-6 xl:hidden" />
      </ContentWithSidebar>
    </>
  );
};

ArticlePageContent.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Content = ArticlePageContent;
const Loading = ArticlePageContentLoading;

export {
  Content,
  Loading,
  //
  ArticlePageContent,
  ArticlePageContentLoading,
};

export type { ArticlePageContentProps };
