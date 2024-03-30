// global modules
import { notFound } from 'next/navigation';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { type ThoughtFP, fetchThought } from '@repo/api-models/thought';

// local modules
import { Aside } from '~/components/aside';
import { Blocks } from '~/components/blocks';
import { type RSCPageProps, getRSCLocaleParam, getRSCStringParam } from '~/src/rsc';

import {
  pagePadding as pagePaddingCn,
  contentRestictor as contentRestictorCn,
} from './page.module.scss';

type ThoughtPageProps = RSCPageProps<'locale' | 'slug'>;

const getThoughtFP = (props: ThoughtPageProps): ThoughtFP => {
  const slug = getRSCStringParam(props, 'slug');
  const locale = getRSCLocaleParam(props);
  return !slug ? notFound() : { locale, slug };
};

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export async function generateMetadata(props: ThoughtPageProps) {
  const blogpostResponse = await fetchThought(getThoughtFP(props));
  return blogpostResponse?.data?.attributes.seo;
}

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default async function ThoughtPage(props: ThoughtPageProps) {
  const locale = getRSCLocaleParam(props);
  const thoughtResponse = await fetchThought(getThoughtFP(props));

  if (!thoughtResponse?.data) notFound();

  const { attributes: blogpost } = thoughtResponse.data;

  return (
    <>
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
