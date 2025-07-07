import { HydrationBoundary } from '@tanstack/react-query';
import type { MetaDescriptor } from 'react-router';

import { getGlobal } from '@shared/lib/get-global';

import {
  getBlogPostJsonLdMeta,
  getBlogPostLink,
  getBlogPostOgMeta,
  getBlogPostTwitterMeta,
} from '@features/blog-posts';

import type { Route } from './+types';
import { loadBlogPostRouteData } from './lib/load-data';
import { BlogPostPage } from './ui/BlogPostPage';

export async function loader(args: Route.LoaderArgs) {
  return loadBlogPostRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadBlogPostRouteData(args);
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  if (!params.data) return [];

  const blogPost = params.data.blogPost;
  const clientHost = getGlobal('REMIX_PUBLIC_CLIENT_HOST');

  return [
    // Basic meta tags
    { title: blogPost.seo?.title || blogPost.title },
    { content: blogPost.seo?.keywords || '', name: 'keywords' },
    { content: blogPost.seo?.description || blogPost.shortDescription || '', name: 'description' },

    // Canonical URL
    { href: `${clientHost}${getBlogPostLink(blogPost)}`, rel: 'canonical' },

    // Open Graph meta tags
    ...getBlogPostOgMeta(blogPost),

    // Twitter Card meta tags
    ...getBlogPostTwitterMeta(blogPost),

    // JSON-LD structured data
    getBlogPostJsonLdMeta(blogPost),
  ];
}

export default function BlogPostRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <BlogPostPage blogPostVariables={props.loaderData.getOneBlogPostVars} />
    </HydrationBoundary>
  );
}
