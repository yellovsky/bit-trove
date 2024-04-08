// global modules
import 'server-only';
import { getTranslations } from 'next-intl/server';
import { Title } from '@bit-trove/ui/title';
import { type FC, Suspense } from 'react';

// local modules
import { PageContent } from '~/components/page-content';
import type { RSCPageProps } from '~/src/rsc';
import { thoughtsPage as thoughtsPageCn, title as titleCn } from './page.module.scss';
import { ThoughtsPageContent, ThoughtsPageContentPending } from './page-content';

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
