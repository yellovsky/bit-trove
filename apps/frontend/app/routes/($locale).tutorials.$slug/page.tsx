// local modules
import type { Tutorial } from '@repo/api-models';
import { useLocale } from '@repo/remix-i18n';
import { type FC, useCallback } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { BlocksIndex } from '~/components/blocks-index';
import { getTutorialRouteLink } from '~/utils/links';
import { Heading } from '~/components/heading';
import { LanguageMismatchInfo } from '~/components/language-mismatch-info';

// local modules
import { index as indexCn, page as pageCn } from './route.module.scss';

interface TutorialPageProps {
  tutorial: Tutorial;
}

export const TutorialPage: FC<TutorialPageProps> = ({ tutorial }) => {
  const locale = useLocale();
  const getLink = useCallback((l: string) => getTutorialRouteLink(tutorial, l), [tutorial]);

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {tutorial.title}
      </Heading>

      <BlocksIndex blocks={tutorial.blocks} className={indexCn} />

      {!tutorial.language_codes.includes(locale) && (
        <LanguageMismatchInfo availableLangCodes={tutorial.language_codes} getLink={getLink} />
      )}

      {tutorial.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </div>
  );
};
