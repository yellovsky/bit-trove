// global modules
import { useTranslation } from 'react-i18next';
import { type FC, useMemo } from 'react';

// common modules
import type { FetchBlogPostListInfiniteVariables } from '~/api/blog-post';
import { getTutorialsRouteLink } from '~/utils/links';
import { TutorialsSlider } from '~/components/tutorials-slider';
import { type FetchTutorialListVariables, useTutorialListInfiniteQuery } from '~/api/tutorial';

// local modules
import { SectionLink } from './section-link';
import { TimelineSection } from './timeline-section';
import { description as descriptionCn, page as pageCn, title as titleCn } from './page.module.scss';

interface IndexPageProps {
  tutorialListVariables: FetchTutorialListVariables;
  blogPostListVariables: FetchBlogPostListInfiniteVariables;
}

export const IndexPage: FC<IndexPageProps> = ({ blogPostListVariables, tutorialListVariables }) => {
  const { t } = useTranslation();

  const tutorialsQuery = useTutorialListInfiniteQuery(tutorialListVariables);
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

      <TimelineSection blogPostListVariables={blogPostListVariables} />
    </div>
  );
};
