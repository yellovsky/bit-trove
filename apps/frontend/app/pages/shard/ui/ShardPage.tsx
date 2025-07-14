import slugify from '@sindresorhus/slugify';
import type { FC } from 'react';

import { getJsonContentTitleString, PoseDocument, renderPoseTitle } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { ContentWithSidebar } from '@shared/ui/ContentWithSidebar';
import { ReadingProgress } from '@shared/ui/ReadingProgress';

import { TableOfContents, type TableOfContentsItem } from '@widgets/blog-post-sidebar';

import { RelatedArticles } from '@features/articles/ui/RelatedArticles';
import {
  ShardBreadcrumbs,
  ShardDetailSkeleton,
  ShardErrorState,
  ShardMetadata,
  ShardNotFoundState,
} from '@features/shards';

import { type ShardGetVariables, useShardQuery } from '@entities/shards';

export const ShardPage: FC<{ shardVariables: ShardGetVariables }> = ({ shardVariables }) => {
  const shardResponse = useShardQuery(shardVariables);
  const shard = shardResponse.data?.data;

  const headings = shard?.contentJSON?.content?.filter((c) => c.type === 'heading');
  const tocItems: TableOfContentsItem[] | undefined = !headings?.length
    ? undefined
    : [
        {
          id: slugify(shard?.title ?? ''),
          level: 1,
          title: shard?.title,
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
      {shard?.id && <RelatedArticles articleId={shard.id} />}
    </>
  );

  // Handle loading state
  if (shardResponse.isPending) {
    return (
      <>
        <ReadingProgress />
        <ContentWithSidebar sidebar={sidebar}>
          <ShardDetailSkeleton />
        </ContentWithSidebar>
      </>
    );
  }

  // Handle error state
  if (shardResponse.isError) {
    const errorMessage = shardResponse.error?.error?.message || 'An error occurred while loading the shard';
    return (
      <>
        <ReadingProgress />
        <ShardErrorState error={{ message: errorMessage } as Error} onRetry={() => shardResponse.refetch()} />
      </>
    );
  }

  // Handle not found state
  if (!shard) {
    return (
      <>
        <ReadingProgress />
        <ShardNotFoundState />
      </>
    );
  }

  return (
    <>
      {/* Reading progress indicator */}
      <ReadingProgress />

      <ContentWithSidebar sidebar={sidebar}>
        <ShardBreadcrumbs className="mb-6" shard={shard} />

        <article aria-labelledby="shard-title">
          {/* Shard header */}
          <header className="mb-8">
            <Heading className="mb-6 text-balance" id={slugify(shard?.title ?? '')} order={1}>
              {shard.title}
            </Heading>

            <ShardMetadata
              author={shard.author}
              publishedAt={shard.publishedAt}
              readingTime={shard.readingTime}
              tags={shard.tags}
            />
          </header>

          {/* Shard content */}
          {shard.contentJSON ? (
            <PoseDocument doc={shard.contentJSON} />
          ) : (
            <output aria-live="polite" className="py-12 text-center">
              <p className="text-muted-foreground">No content available for this shard.</p>
            </output>
          )}
        </article>

        {/* Related articles at the bottom */}
        <section className="mt-12 border-t pt-8">
          <RelatedArticles articleId={shard.id} className="space-y-4" />
        </section>
      </ContentWithSidebar>
    </>
  );
};
