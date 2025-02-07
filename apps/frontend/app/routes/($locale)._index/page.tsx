// global modules
import { useTranslation } from 'react-i18next';
import type { BlogPostListFP, TutorialListFP } from '@repo/api-models';
import { type FC, useMemo } from 'react';

// common modules
import { getTutorialsRouteLink } from '~/utils/links';
import { TutorialsSlider } from '~/components/tutorials-slider';
import { useTutorialListInfiniteQuery } from '~/api/tutorial';

// local modules
import { SectionLink } from './section-link';
import { TimelineSection } from './timeline-section';
import { description as descriptionCn, page as pageCn, title as titleCn } from './page.module.scss';

interface IndexPageProps {
  tutorialListFP: TutorialListFP;
  blogPostListFP: BlogPostListFP;
}

export const IndexPage: FC<IndexPageProps> = ({ blogPostListFP, tutorialListFP }) => {
  const { t } = useTranslation();

  const tutorialsQuery = useTutorialListInfiniteQuery(tutorialListFP);
  const tutorials = useMemo(
    () =>
      tutorialsQuery.data?.pages
        .map(page => page.data)
        .flat()
        .filter(val => !!val),
    [tutorialsQuery.data],
  );

  return (
    <div className={pageCn}>
      <div className={titleCn}>{t('INDEX_PAGE_TITLE')}</div>
      <div className={descriptionCn}>{t('INDEX_PAGE_DESCRIPTION')}</div>

      <SectionLink to={getTutorialsRouteLink()}>{t('TUTORIALS_PAGE_TITLE')}</SectionLink>
      <TutorialsSlider
        hasNextPage={tutorialsQuery.hasNextPage}
        pending={!tutorialsQuery.isFetched}
        tutorials={tutorials}
      />

      <TimelineSection blogPostListFP={blogPostListFP} />
    </div>
  );
};
