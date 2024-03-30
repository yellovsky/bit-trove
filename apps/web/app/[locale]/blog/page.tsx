// global modules
import { Title } from '@repo/ui/title';
import { getTranslations } from 'next-intl/server';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';

// local modules
import { Aside } from '~/components/aside';
import { BlogpostList } from '~/components/blogpost-list';
import { blogPage as blogPageCn } from './page.module.scss';
import { getRSCLocaleParam, type RSCPageProps } from '~/src/rsc';

export default async function BlogPage(props: RSCPageProps<'locale'>) {
  const t = await getTranslations();
  const locale = getRSCLocaleParam(props);

  return (
    <TwoColumnsLayout className={blogPageCn} extraContent={<Aside locale={locale} />}>
      <Title as="h1">{t('blogs_page')}</Title>

      <BlogpostList locale={locale} />
    </TwoColumnsLayout>
  );
}
