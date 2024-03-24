// global modules
import { initialPageParam } from '@repo/api-models/common';
import { fetchBlogpostSegmentList } from '@repo/api-models/blog-post';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

// local modules
import { BlogPostContent } from './_page-content';
import { getRSCLocaleParam, type RSCPageProps } from '~/src/rsc';

export default async function BlogPage(props: RSCPageProps<'locale'>) {
  const locale = getRSCLocaleParam(props);

  const queryClient = new QueryClient();

  const blogPostListFP = { locale };
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['blogpost_segment_list', blogPostListFP],
    queryFn: fetchBlogpostSegmentList,
    initialPageParam,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogPostContent blogPostListFP={blogPostListFP} />
    </HydrationBoundary>
  );
}
