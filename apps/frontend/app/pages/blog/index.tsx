import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import appI18next from '@app/localization/i18n.server';

import { getBlogPostsJsonLdMeta, getBlogPostsOgMeta, getBlogPostsTwitterMeta } from '@features/blog-posts';

import type { Route } from './+types';
import { loadBlogPostsRouteData } from './load-data';
import { BlogPostsPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  const t = await appI18next.getFixedT(args.params.locale);
  const tBlogPosts = await appI18next.getFixedT(args.params.locale, 'blog_posts');

  return loadBlogPostsRouteData(t, tBlogPosts, args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('blog_posts');
  const t = i18next.getFixedT(args.params.locale);
  const tBlogPosts = i18next.getFixedT(args.params.locale, 'blog_posts');

  return loadBlogPostsRouteData(t, tBlogPosts, args);
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  if (!params.data) return [];

  return [
    { title: params.data.metaTitle },
    { content: params.data.metaKeywords, name: 'keywords' },
    { content: params.data.metaDescription, name: 'description' },
    ...getBlogPostsOgMeta(),
    ...getBlogPostsTwitterMeta(),
    getBlogPostsJsonLdMeta(),
  ];
}

export default function BlogRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <BlogPostsPage blogPostsVars={props.loaderData.blogPostsVars} />
    </HydrationBoundary>
  );
}
