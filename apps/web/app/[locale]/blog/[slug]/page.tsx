// global modules
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@bit-trove/localization/link';
import { RichTextBlock } from '@repo/ui/rich-text-block';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { getUploadFileUrl } from '@repo/api-models/upload-file';
import { fetchBlogpost, type BlogpostFP } from '@repo/api-models/blog-post';

// local modules
import { Aside } from '~/components/aside';
import { BlogpostPageHeader } from '~/components/blogpost/page-header';
import { type RSCPageProps, getRSCLocaleParam, getRSCStringParam } from '~/src/rsc';

import {
  cover as coverCn,
  pagePadding as pagePaddingCn,
  contentRestictor as contentRestictorCn,
} from './page.module.scss';
import type { Block } from '@repo/api-models/block';

type BlogPageProps = RSCPageProps<'locale' | 'slug'>;

const getBlogPostFP = (props: BlogPageProps): BlogpostFP => {
  const slug = getRSCStringParam(props, 'slug');
  const locale = getRSCLocaleParam(props);
  return !slug ? notFound() : { locale, slug };
};

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export async function generateMetadata(props: BlogPageProps) {
  const blogpostResponse = await fetchBlogpost(getBlogPostFP(props));
  return blogpostResponse?.data?.attributes.seo;
}

const renderBlock = (block: Block) => {
  switch (block.__component) {
    case 'blocks.rich-text-block':
      return <RichTextBlock key={block.id} block={block} />;
    default:
      return null;
  }
};

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default async function page(props: BlogPageProps) {
  const locale = getRSCLocaleParam(props);
  const blogpostResponse = await fetchBlogpost(getBlogPostFP(props));

  if (!blogpostResponse?.data) notFound();

  const { attributes: blogpost } = blogpostResponse.data;

  return (
    <>
      <Link href={`/blog/${blogpost.slug}`} locale={locale === 'en' ? 'ru' : 'en'}>
        locale: : {locale}
      </Link>

      <div className={pagePaddingCn}>
        <BlogpostPageHeader blogpostResponseData={blogpostResponse.data} />
      </div>

      {!blogpost.cover.data ? null : (
        <div className={coverCn}>
          <Image
            fill
            unoptimized
            alt="cover"
            style={{ objectFit: 'cover' }}
            src={getUploadFileUrl(blogpost.cover.data.attributes)}
          />
        </div>
      )}

      <TwoColumnsLayout
        className={pagePaddingCn}
        contentCn={contentRestictorCn}
        extraContent={<Aside locale={locale} />}
      >
        {blogpost.blocks.map(renderBlock)}
      </TwoColumnsLayout>
    </>
  );
}
