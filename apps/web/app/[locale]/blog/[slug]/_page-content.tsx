'use client';

// global modules
import type { FC } from 'react';
import { apiHost } from '@repo/utils/api-host';
import { RichTextBlock } from '@repo/ui/rich-text-block';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { shortenItemsCount } from '@repo/utils/shorten-items-count';

import {
  FullBlogPostQueryResponse,
  type FullBlogPostVariables,
  FULL_BLOG_POST_QUERY,
} from '@repo/api-models/blog-post';

// local modules
import { notFound } from 'next/navigation';
import { ViewsTrigger } from './_views-trigger';
import { pagePadding as pagePaddingCn } from './page.module.scss';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { AsideCategories } from '~/components/aside-categories/aside-categories.component';

const commentsCount = 10;
const publishDate = 'Posted On November 8, 2016';
const author = {
  href: '/',
  name: 'Jack Dawson',
  avatar:
    'https://themes-themegoods.b-cdn.net/grandmagazine/demo/wp-content/uploads/2016/11/cropped-author1-60x60.jpg',
};

interface BlogPostPageProps {
  initialVariables: FullBlogPostVariables;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ initialVariables }) => {
  const { data } = useQuery<FullBlogPostQueryResponse, FullBlogPostVariables>(
    FULL_BLOG_POST_QUERY,
    { variables: initialVariables }
  );

  const blogpost = data?.blogposts.data?.[0];

  if (!blogpost) notFound();

  const tags = blogpost.attributes.tags.data.map((tag) => ({
    href: `/tags/${tag.attributes.slug}`,
    name: tag.attributes.name,
  }));

  const extraContent = (
    <>
      <AsideCategories categories={blogpost.attributes.categories.data} />
    </>
  );

  return (
    <>
      <ViewsTrigger itemID={blogpost.id} />
      <ContentPageHeader
        author={author}
        tags={tags}
        className={pagePaddingCn}
        viewsCount={shortenItemsCount(blogpost.attributes.views_count)}
        publishDate={publishDate}
        commentsCount={commentsCount}
        cover={apiHost(blogpost.attributes.cover.data?.attributes.url)}
      >
        {blogpost.attributes.title}
      </ContentPageHeader>

      <TwoColumnsLayout className={pagePaddingCn} extraContent={extraContent}>
        {blogpost.attributes.blocks.map((block) => (
          <RichTextBlock key={block.id} block={block} />
        ))}
      </TwoColumnsLayout>
    </>
  );
};
