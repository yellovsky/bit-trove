// global modules
import { TextPending } from '@repo/ui/text';

// local modules
import { useLocale } from 'next-intl';
import { PageContent } from '~/components/page-content';
import { sanitizeLocale } from '@bit-trove/localization/config';
import { ContentPageHeaderPending } from '@repo/ui/content-page-header';

export default function ThoughtPageLoading() {
  const locale = useLocale();

  return (
    <>
      <ContentPageHeaderPending />
      <PageContent locale={sanitizeLocale(locale)}>
        <TextPending lines={5} />
      </PageContent>
    </>
  );
}
