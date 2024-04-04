// global modules
import { Title } from '@repo/ui/title';
import { getTranslations } from 'next-intl/server';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';

// local modules
import { Aside } from '~/components/aside';
import type { RSCPageProps } from '~/src/rsc';
import { BlogpostList } from '~/components/blogpost-list';
import { blogPage as blogPageCn } from './page.module.scss';

export default async function BlogPage(props: RSCPageProps) {
  const t = await getTranslations();
  const locale = props.params.locale;

  return (
    <TwoColumnsLayout className={blogPageCn} extraContent={<Aside locale={locale} />}>
      <Title as="h1">{t('blogs_page')}</Title>

      <BlogpostList locale={locale} />
    </TwoColumnsLayout>
  );
}
