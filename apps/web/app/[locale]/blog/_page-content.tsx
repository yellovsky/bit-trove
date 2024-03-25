'use client';

// global modules
import type { FC } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { initialPageParam, getNextPageParam } from '@repo/api-models/common';
import { fetchBlogpostSegmentList, type BlogpostSegmentListFP } from '@repo/api-models/blog-post';

// local modules
import { LoadMoreWhenVisible } from '~/components/load-more-when-visible';
import { blogList as blogListCn, blogPage as blogPageCn } from './page.module.scss';
import { BlogpostHorizontalPreview } from '~/components/blogpost/horizontal-preview';

interface BlogPostContentProps {
  blogPostListFP: BlogpostSegmentListFP;
}

export const BlogPostContent: FC<BlogPostContentProps> = (props) => {
  const { data, status, error, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['blogpost_segment_list', props.blogPostListFP],
      queryFn: fetchBlogpostSegmentList,
      initialPageParam,
      getNextPageParam,
    });

  if (status === 'pending') return <div>loading...</div>;
  if (status === 'error') return <div>{error.message}</div>;

  const blogpostList = data?.pages.map((page) => page.data).flat();
  console.log('blogpostList', blogpostList);
  return (
    <div className={blogPageCn}>
      <div className={blogListCn}>
        {blogpostList.map((blogpost) => (
          <BlogpostHorizontalPreview
            key={blogpost.attributes.slug}
            blogpostResponseData={blogpost}
          />
        ))}
      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>

      <LoadMoreWhenVisible
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        trigger={fetchNextPage}
      />
    </div>
  );
};
