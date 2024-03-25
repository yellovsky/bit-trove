// global modules
import { notFound } from 'next/navigation';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchBlogpost, type BlogpostFP, type BlogpostResponse } from '@repo/api-models/blog-post';

// local modules
import { BlogPostPage } from './_page-content';
import { getQueryClient } from '~/src/query-client';
import { type RSCPageProps, getRSCLocaleParam, getRSCStringParam } from '~/src/rsc';

type BlogPageProps = RSCPageProps<'locale' | 'slug'>;

const getBlogPostFp = (props: BlogPageProps): BlogpostFP => {
  const slug = getRSCStringParam(props, 'slug');
  const locale = getRSCLocaleParam(props);

  if (!slug) notFound();
  console.log({ locale, slug });
  return { locale, slug };
};

const prepareQueryClient = async (props: BlogPageProps): Promise<QueryClient> => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['blogpost', getBlogPostFp(props)],
    queryFn: fetchBlogpost,
  });

  return queryClient;
};

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export async function generateMetadata(props: BlogPageProps) {
  const queryClient = await prepareQueryClient(props);
  const blogpostResponse = queryClient.getQueryData<BlogpostResponse>([
    'blogpost',
    getBlogPostFp(props),
  ]);

  return blogpostResponse?.data?.attributes.seo;
}

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default async function page(props: BlogPageProps) {
  const queryClient = await prepareQueryClient(props);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogPostPage blogpostFP={getBlogPostFp(props)} />
    </HydrationBoundary>
  );
}
