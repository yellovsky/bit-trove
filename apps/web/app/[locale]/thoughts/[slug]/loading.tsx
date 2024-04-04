// global modules
import 'server-only';
import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { TextPending } from '@bit-trove/ui/text';
import { sanitizeLocale } from '@bit-trove/localization/config';
import { ContentPageHeaderPending } from '@bit-trove/ui/content-page-header';

// local modules
import { PageContent } from '~/components/page-content';

const ThoughtPageLoading: FC = () => {
  const locale = useLocale();

  return (
    <>
      <ContentPageHeaderPending />
      <PageContent locale={sanitizeLocale(locale)}>
        <TextPending lines={5} />
      </PageContent>
    </>
  );
};

export default ThoughtPageLoading;
