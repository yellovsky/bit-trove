// local modules
import { useLocale } from 'next-intl';
import { TitlePending } from '@repo/ui/title';
import { sanitizeLocale } from '@bit-trove/localization/config';

// locL modules
import { PageContent } from '~/components/page-content';
import { ThoughtsTimelinePending } from '~/components/thoughts-timeline';
import { thoughtsPage as thoughtsPageCn, title as titleCn } from './page.module.scss';

export default function ThoughtsPageLoading() {
  const locale = useLocale();

  return (
    <PageContent className={thoughtsPageCn} locale={sanitizeLocale(locale)}>
      <TitlePending styledAs="h1" className={titleCn} />
      <ThoughtsTimelinePending />
    </PageContent>
  );
}
