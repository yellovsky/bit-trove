'use client';

// global modules
import { BlogPostHorizontalPreview } from '@repo/ui/blog-post-horizontal-preview';

import {
  PARTIAL_BLOG_POST_LIST_QUERY,
  type BlogPostListVariables,
  type BlogPostListQueryResponse,
} from '@repo/api-models/blog-post';

// local modules
import { useState, type FC, useCallback } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { blogPage as blogPageCn, blogList as blogListCn } from './page.module.scss';

interface BlogPostContentProps {
  initialVariables: BlogPostListVariables;
}

export const BlogPostContent: FC<BlogPostContentProps> = (props) => {
  const [variables, setVariables] = useState(props.initialVariables);
  const { data, fetchMore, refetch } = useQuery<BlogPostListQueryResponse, BlogPostListVariables>(
    PARTIAL_BLOG_POST_LIST_QUERY,
    { variables }
  );

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { offset: data?.blogposts.data.length || 0 },
      updateQuery: (preveResult, { fetchMoreResult }) => ({
        ...preveResult,
        blogposts: {
          ...preveResult.blogposts,
          data: [...preveResult.blogposts.data, ...fetchMoreResult.blogposts.data],
        },
      }),
    });
  }, [data]);

  return (
    <div className={blogPageCn}>
      <div className={blogListCn}>
        {data?.blogposts.data.map((blogpost) => (
          <BlogPostHorizontalPreview key={blogpost.id} blogpost={blogpost} />
        ))}
      </div>
      <button onClick={loadMore}>fetchMore</button>
      <button onClick={() => refetch()}>refetch</button>
      <button
        onClick={() => setVariables((p) => ({ ...p, offset: data?.blogposts.data.length || 0 }))}
      >
        sfp
      </button>
      <button
        onClick={() =>
          setVariables((p) => ({
            ...p,
            sort: [p.sort[0] === 'createdAt:asc' ? 'createdAt:desc' : 'createdAt:asc'],
          }))
        }
      >
        toggle
      </button>
    </div>
  );
};
