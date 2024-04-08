// global modules
import type { FC } from 'react';
import { fetchBlogpostSegmentCollection } from '@bit-trove/api-models/blog-post';
import { initialPageParam } from '@bit-trove/api-models/common';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

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
    initialPageParam,
    queryFn: fetchBlogpostSegmentCollection,
    queryKey,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogpostListClient queryKey={queryKey} />
    </HydrationBoundary>
  );
};
