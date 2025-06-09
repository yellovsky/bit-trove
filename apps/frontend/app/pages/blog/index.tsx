import { HydrationBoundary } from '@tanstack/react-query';

import type { Route } from './+types';
import { loadBlogPostsRouteData } from './load-data';
import { BlogPostsPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  return loadBlogPostsRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadBlogPostsRouteData(args);
}

export default function BlogRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <BlogPostsPage blogPostsVars={props.loaderData.blogPostsVars} />
    </HydrationBoundary>
  );
}
