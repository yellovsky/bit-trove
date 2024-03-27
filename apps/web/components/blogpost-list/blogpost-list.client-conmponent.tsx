'use client';

// global modules
import type { FC } from 'react';
import type { QueryKeyOf } from '@repo/api-models/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBlogpostSegmentCollection } from '@repo/api-models/blog-post';
import { initialPageParam, getNextPageParam } from '@repo/api-models/common';

// local modules
import { blogList as blogListCn } from './blogpost-list.module.scss';
import { LoadMoreWhenVisible } from '~/components/load-more-when-visible';
import {
  BlogpostHorizontalPreview,
  BlogpostHorizontalPreviewPending,
} from '~/components/blogpost/horizontal-preview';

interface BlogpostListClientProps {
  queryKey: QueryKeyOf<typeof fetchBlogpostSegmentCollection>;
}

export const BlogpostListClient: FC<BlogpostListClientProps> = ({ queryKey }) => {
  const { data, status, error, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchBlogpostSegmentCollection,
      initialPageParam,
      getNextPageParam,
    });

  if (status === 'pending') {
    return (
      <>
        <BlogpostHorizontalPreviewPending />
        <BlogpostHorizontalPreviewPending />
        <BlogpostHorizontalPreviewPending />
      </>
    );
  }

  if (status === 'error') return <div>{error.message}</div>;

  const blogpostList = data?.pages.map((page) => page.data).flat();

  return (
    <>
      <div className={blogListCn}>
        {blogpostList.map((blogpost) => (
          <BlogpostHorizontalPreview
            key={blogpost.attributes.slug}
            blogpostResponseData={blogpost}
          />
        ))}
      </div>

      <div>{isFetching && !isFetchingNextPage ? <BlogpostHorizontalPreviewPending /> : null}</div>

      <LoadMoreWhenVisible
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        trigger={fetchNextPage}
      />
    </>
  );
};
