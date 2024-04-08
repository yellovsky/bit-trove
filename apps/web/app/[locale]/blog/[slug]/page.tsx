// global modules
import { getUploadFileUrl } from '@bit-trove/api-models/upload-file';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';
import { notFound } from 'next/navigation';
import { TwoColumnsLayout } from '@bit-trove/ui/two-columns-layout';
import { type BlogpostFP, fetchBlogpost } from '@bit-trove/api-models/blog-post';

// local modules
import { Aside } from '~/components/aside';
import { Blocks } from '~/components/blocks';
import { BlogpostPageHeader } from '~/components/blogpost/page-header';
import type { RSCPageProps } from '~/src/rsc';

import {
  contentRestictor as contentRestictorCn,
  cover as coverCn,
  pagePadding as pagePaddingCn,
} from './page.module.scss';

type BlogPageProps = RSCPageProps<{ slug: string }>;

const getBlogPostFP = (props: BlogPageProps): BlogpostFP => {
  const slug = props.params.slug;
  const locale = props.params.locale;
  return !slug ? notFound() : { locale, slug };
};

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export async function generateMetadata(props: BlogPageProps) {
  const blogpostResponse = await fetchBlogpost(getBlogPostFP(props));
  const metadata = blogpostResponse?.data?.attributes.seo;
  return metadata ?? notFound();
}

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default async function page(props: BlogPageProps) {
  const locale = props.params.locale;
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
            src={getUploadFileUrl(blogpost.cover.data.attributes)}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <TwoColumnsLayout
        className={pagePaddingCn}
        contentCn={contentRestictorCn}
        extraContent={<Aside locale={locale} />}
      >
        <Blocks blocks={blogpost.blocks} />
      </TwoColumnsLayout>
    </>
  );
}
