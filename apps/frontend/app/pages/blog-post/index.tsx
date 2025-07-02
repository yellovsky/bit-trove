import { HydrationBoundary } from '@tanstack/react-query';

import type { Route } from './+types';
import { loadBlogPostRouteData } from './load-data';
import { BlogPostPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  return loadBlogPostRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadBlogPostRouteData(args);
}

export function meta(params: Route.MetaArgs) {
  if (!params.data) return [];

  return [
    { title: params.data.blogPost.seo.title || params.data.blogPost.title },
    { content: params.data.blogPost.seo.keywords, name: 'keywords' },
    { content: params.data.blogPost.seo.description, name: 'description' },
  ];
}

export default function BlogPostRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <BlogPostPage blogPostVariables={props.loaderData.getOneBlogPostVars} />
    </HydrationBoundary>
  );
}
