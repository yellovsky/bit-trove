// global modules
import { Title } from '@repo/ui/title';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';

// local modules
import { Aside } from '~/components/aside';
import { blogPage as blogPageCn } from './page.module.scss';
import { getRSCLocaleParam, type RSCPageProps } from '~/src/rsc';
import { ThoughtsTimeline } from '~/components/thoughts-timeline';

export default async function BlogPage(props: RSCPageProps<'locale'>) {
  const locale = getRSCLocaleParam(props);

  return (
    <TwoColumnsLayout className={blogPageCn} extraContent={<Aside locale={locale} />}>
      <Title as="h1">Thoughts</Title>

      <ThoughtsTimeline locale={locale} />
    </TwoColumnsLayout>
  );
}
