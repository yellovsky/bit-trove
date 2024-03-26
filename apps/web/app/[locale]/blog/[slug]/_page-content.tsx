'use client';

// global modules
import Image from 'next/image';
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@bit-trove/localization/link';
import { RichTextBlock } from '@repo/ui/rich-text-block';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { getUploadFileUrl } from '@repo/api-models/upload-file';
import { type BlogpostFP, fetchBlogpost } from '@repo/api-models/blog-post';

// local modules
import { Aside } from '~/components/aside';
import { BlogpostPageHeader } from '~/components/blogpost/page-header';
import { pagePadding as pagePaddingCn, cover as coverCn } from './page.module.scss';

interface BlogPostPageProps {
  blogpostFP: BlogpostFP;
}

export const BlogPostPage: FC<BlogPostPageProps> = ({ blogpostFP }) => {
  const locale = useLocale();

  const { data, status, error } = useQuery({
    queryKey: ['blogpost', blogpostFP],
    queryFn: fetchBlogpost,
  });

  if (status === 'pending') return <div>loading...</div>;
  if (status === 'error') return <div>{error.message}</div>;

  const blogpostResponseData = data.data;
  if (!blogpostResponseData) notFound();

  return (
    <>
      <Link
        href={`/blog/${blogpostResponseData.attributes.slug}`}
        locale={locale === 'en' ? 'ru' : 'en'}
      >
        locale: : {locale}
      </Link>

      <div className={pagePaddingCn}>
        <BlogpostPageHeader blogpostResponseData={blogpostResponseData} />
      </div>

      {!data.data?.attributes.cover.data ? null : (
        <div className={coverCn}>
          <Image
            unoptimized
            alt="cover"
            layout="fill"
            objectFit="cover"
            src={getUploadFileUrl(data.data?.attributes.cover.data.attributes)}
          />
        </div>
      )}

      <TwoColumnsLayout className={pagePaddingCn} extraContent={<Aside />}>
        {blogpostResponseData.attributes.blocks.map((block) => (
          <RichTextBlock key={block.id} block={block} />
        ))}
      </TwoColumnsLayout>
    </>
  );
};
