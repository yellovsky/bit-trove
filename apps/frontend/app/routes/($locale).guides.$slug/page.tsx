// local modules
import type { GuideItem } from '@repo/api-models';
import { useLocale } from '@repo/remix-i18n';
import { type FC, useCallback } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { BlocksIndex } from '~/components/blocks-index';
import { getGuideRouteLink } from '~/utils/links';
import { Heading } from '~/components/heading';
import { LanguageMismatchInfo } from '~/components/language-mismatch-info';

// local modules
import { index as indexCn, page as pageCn } from './route.module.scss';

interface GuidePageProps {
  guide: GuideItem;
}

export const GuidePage: FC<GuidePageProps> = ({ guide }) => {
  const locale = useLocale();
  const getLink = useCallback((l: string) => getGuideRouteLink(guide, l), [guide]);

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {guide.title}
      </Heading>

      <BlocksIndex blocks={guide.blocks} className={indexCn} />

      {!guide.language_codes.includes(locale) && (
        <LanguageMismatchInfo availableLangCodes={guide.language_codes} getLink={getLink} />
      )}

      {guide.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </div>
  );
};
