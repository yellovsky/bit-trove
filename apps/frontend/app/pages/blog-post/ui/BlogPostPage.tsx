import slugify from '@sindresorhus/slugify';
import type { FC } from 'react';

import { getJsonContentTitleString, PoseDocument, renderPoseTitle } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { ContentWithSidebar } from '@shared/ui/ContentWithSidebar';
import { ReadingProgress } from '@shared/ui/ReadingProgress';

import { TableOfContents, type TableOfContentsItem } from '@widgets/blog-post-sidebar';

import { RelatedArticles } from '@features/articles/ui/RelatedArticles';
import {
  BackToBlogListButton,
  BlogPostBreadcrumbs,
  BlogPostDetailSkeleton,
  BlogPostErrorState,
  BlogPostMetadata,
  BlogPostNotFoundState,
} from '@features/blog-posts';

import { type BlogPostGetVariables, useBlogPostQuery } from '@entities/blog-posts';

export const BlogPostPage: FC<{ blogPostVariables: BlogPostGetVariables }> = ({ blogPostVariables }) => {
  const blogPostResponse = useBlogPostQuery(blogPostVariables);
  const blogPost = blogPostResponse.data?.data;

  const headings = blogPost?.contentJSON?.content?.filter((c) => c.type === 'heading');
  const tocItems: TableOfContentsItem[] | undefined = !headings?.length
    ? undefined
    : [
        {
          id: slugify(blogPost?.title ?? ''),
          level: 1,
          title: blogPost?.title,
        },
        ...headings.map((c) => ({
          id: slugify(getJsonContentTitleString(c)),
          level: c.attrs?.level ?? 2,
          title: renderPoseTitle(c),
        })),
      ];

  const sidebar = (
    <>
      <TableOfContents items={tocItems} />
      {blogPost?.id && <RelatedArticles articleId={blogPost.id} />}
    </>
  );

  // Handle loading state
  if (blogPostResponse.isPending) {
    return (
      <>
        <ReadingProgress />
        <ContentWithSidebar sidebar={sidebar}>
          <BlogPostDetailSkeleton />
        </ContentWithSidebar>
      </>
    );
  }

  // Handle error state
  if (blogPostResponse.isError) {
    const errorMessage = blogPostResponse.error?.error?.message || 'An error occurred while loading the blog post';
    return (
      <>
        <ReadingProgress />
        <BlogPostErrorState error={{ message: errorMessage } as Error} onRetry={() => blogPostResponse.refetch()} />
      </>
    );
  }

  // Handle not found state
  if (!blogPost) {
    return (
      <>
        <ReadingProgress />
        <BlogPostNotFoundState />
      </>
    );
  }

  return (
    <>
      {/* Reading progress indicator */}
      <ReadingProgress />

      <ContentWithSidebar sidebar={sidebar}>
        {/* Navigation section */}
        <nav aria-label="Blog post navigation" className="mb-6 flex items-center justify-between">
          <BlogPostBreadcrumbs blogPost={blogPost} />
          <BackToBlogListButton />
        </nav>

        <article aria-labelledby="blog-post-title">
          {/* Blog post header */}
          <header className="mb-8">
            <Heading className="mb-6 text-balance" id={slugify(blogPost?.title ?? '')} order={1}>
              {blogPost.title}
            </Heading>

            <BlogPostMetadata
              author={blogPost.author}
              publishedAt={blogPost.publishedAt}
              readingTime={blogPost.readingTime}
              tags={blogPost.tags}
            />
          </header>

          {/* Blog post content */}
          {blogPost.contentJSON ? (
            <PoseDocument doc={blogPost.contentJSON} />
          ) : (
            <output aria-live="polite" className="py-12 text-center">
              <p className="text-muted-foreground">No content available for this blog post.</p>
            </output>
          )}
        </article>

        {/* Related articles at the bottom */}
        <section className="mt-12 border-t pt-8">
          <RelatedArticles articleId={blogPost.id} className="space-y-4" />
        </section>
      </ContentWithSidebar>
    </>
  );
};
