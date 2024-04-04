// global modules
import 'server-only';
import { Suspense, type FC } from 'react';
import { Title } from '@bit-trove/ui/title';
import { getTranslations } from 'next-intl/server';

// local modules
import type { RSCPageProps } from '~/src/rsc';
import { PageContent } from '~/components/page-content';
import { ThoughtsPageContent, ThoughtsPageContentPending } from './page-content';
import { thoughtsPage as thoughtsPageCn, title as titleCn } from './page.module.scss';

const ThoughtsPage: FC<RSCPageProps> = async ({ params }) => {
  const t = await getTranslations();

  return (
    <PageContent className={thoughtsPageCn} locale={params.locale}>
      <Title as="h1" className={titleCn}>
        {t('thoughts_page')}
      </Title>
      <Suspense fallback={<ThoughtsPageContentPending />}>
        <ThoughtsPageContent locale={params.locale} />
      </Suspense>
    </PageContent>
  );
};

export default ThoughtsPage;
