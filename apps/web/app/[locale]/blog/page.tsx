// global modules
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';

// local modules
import { Aside } from '~/components/aside';
import { BlogpostList } from '~/components/blogpost-list';
import { blogPage as blogPageCn } from './page.module.scss';
import { getRSCLocaleParam, type RSCPageProps } from '~/src/rsc';

export default function BlogPage(props: RSCPageProps<'locale'>) {
  const locale = getRSCLocaleParam(props);

  return (
    <TwoColumnsLayout className={blogPageCn} extraContent={<Aside locale={locale} />}>
      <BlogpostList locale={locale} />
    </TwoColumnsLayout>
  );
}
