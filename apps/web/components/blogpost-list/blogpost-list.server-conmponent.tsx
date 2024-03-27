// global modules
import type { FC } from 'react';
import type { QueryKeyOf } from '@repo/api-models/common';
import { initialPageParam } from '@repo/api-models/common';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { fetchBlogpostSegmentCollection } from '@repo/api-models/blog-post';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

// local modules
import { BlogpostListClient } from './blogpost-list.client-conmponent';

interface BlogpostListProps {
  locale: SupportedLocale;
}

export const BlogpostList: FC<BlogpostListProps> = async ({ locale }) => {
  const queryClient = new QueryClient();

  const queryKey: QueryKeyOf<typeof fetchBlogpostSegmentCollection> = [
    'blogpost_segment_list',
    { locale },
  ];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: fetchBlogpostSegmentCollection,
    initialPageParam,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogpostListClient queryKey={queryKey} />
    </HydrationBoundary>
  );
};
