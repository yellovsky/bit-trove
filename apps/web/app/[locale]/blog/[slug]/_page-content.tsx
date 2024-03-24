'use client';

// global modules
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { apiHost } from '@repo/utils/api-host';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@bit-trove/localization/link';
import { RichTextBlock } from '@repo/ui/rich-text-block';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { shortenItemsCount } from '@repo/utils/shorten-items-count';
import { type BlogpostFP, fetchBlogpost } from '@repo/api-models/blog-post';

// local modules
import { pagePadding as pagePaddingCn } from './page.module.scss';

const commentsCount = 10;
const publishDate = 'Posted On November 8, 2016';
const author = {
  href: '/',
  name: 'Jack Dawson',
  avatar:
    'https://themes-themegoods.b-cdn.net/grandmagazine/demo/wp-content/uploads/2016/11/cropped-author1-60x60.jpg',
};

interface BlogPostPageProps {
  blogpostFP: BlogpostFP;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ blogpostFP }) => {
  const { data, status, error } = useQuery({
    queryKey: ['blogpost', blogpostFP],
    queryFn: fetchBlogpost,
  });

  if (status === 'pending') return <div>loading...</div>;
  if (status === 'error') return <div>{error.message}</div>;

  const blogpost = data?.data?.attributes;
  console.log('blogpost', blogpost);
  if (!blogpost) notFound();

  // const tags = blogpost.attributes.tags.data.map((tag) => ({
  //   href: `/tags/${tag.attributes.slug}`,
  //   name: tag.attributes.name,
  // }));

  const extraContent = null;
  // const extraContent = (
  //   <>
  //     <AsideCategories categories={blogpost.attributes.categories.data} />
  //   </>
  // );

  const locale = useLocale();
  return (
    <>
      <Link href={`/blog/${blogpost.slug}`} locale={locale === 'en' ? 'ru' : 'en'}>
        locale: : {locale}
      </Link>
      {/* <ViewsTrigger itemID={data.data?.id} /> */}
      <ContentPageHeader
        author={author}
        // tags={tags}
        className={pagePaddingCn}
        viewsCount={shortenItemsCount(blogpost.views_count)}
        publishDate={publishDate}
        commentsCount={commentsCount}
        cover={apiHost(blogpost.cover.data?.attributes.url)}
      >
        {blogpost.title}
      </ContentPageHeader>

      <TwoColumnsLayout className={pagePaddingCn} extraContent={extraContent}>
        {blogpost.blocks.map((block) => (
          <RichTextBlock key={block.id} block={block} />
        ))}
      </TwoColumnsLayout>
    </>
  );
};
