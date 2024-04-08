'use client';

// global modules
import type { FC } from 'react';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { blogPostLink, fetchBlogpostSegmentCollection } from '@bit-trove/api-models/blog-post';
import { getNextPageParam, initialPageParam } from '@bit-trove/api-models/common';
import { HorizontalCard, HorizontalCardPending } from '@bit-trove/ui/horizontal-card';

// local modules
import { blogList as blogListCn } from './blogpost-list.module.scss';
import { LoadMoreWhenVisible } from '~/components/load-more-when-visible';

interface BlogpostListClientProps {
  queryKey: QueryKeyOf<typeof fetchBlogpostSegmentCollection>;
}

export const BlogpostListClient: FC<BlogpostListClientProps> = ({ queryKey }) => {
  const { data, status, error, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      getNextPageParam,
      initialPageParam,
      queryFn: fetchBlogpostSegmentCollection,
      queryKey,
    });

  if (status === 'pending') {
    return (
      <>
        <HorizontalCardPending />
        <HorizontalCardPending />
        <HorizontalCardPending />
      </>
    );
  }

  if (status === 'error') return <div>{error.message}</div>;

  const blogpostList = data?.pages.map((page) => page.data).flat();

  return (
    <>
      <div className={blogListCn}>
        {blogpostList.map((blogpost, index) => (
          <HorizontalCard
            author={blogpost.attributes.author.data?.attributes}
            description={blogpost.attributes.short_description}
            href={blogPostLink(blogpost.attributes)}
            img={blogpost.attributes.cover.data?.attributes}
            key={index}
            publishedAt={blogpost.attributes.publishedAt}
            tags={blogpost.attributes.tags.data.map((t) => t.attributes)}
            title={blogpost.attributes.title}
          />
        ))}
      </div>

      <div>{isFetching && !isFetchingNextPage ? <HorizontalCardPending /> : null}</div>

      <LoadMoreWhenVisible
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        trigger={fetchNextPage}
      />
    </>
  );
};
