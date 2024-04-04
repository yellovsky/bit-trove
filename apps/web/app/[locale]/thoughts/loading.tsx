// local modules
import 'server-only';
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { TitlePending } from '@bit-trove/ui/title';
import { sanitizeLocale } from '@bit-trove/localization/config';

// locL modules
import { PageContent } from '~/components/page-content';
import { ThoughtsPageContentPending } from './page-content';
import { thoughtsPage as thoughtsPageCn, title as titleCn } from './page.module.scss';

const ThoughtsPageLoading: FC = () => {
  const locale = useLocale();

  return (
    <PageContent className={thoughtsPageCn} locale={sanitizeLocale(locale)}>
      <TitlePending styledAs="h1" className={titleCn} />
      <ThoughtsPageContentPending />
    </PageContent>
  );
};

export default ThoughtsPageLoading;
