// global modules
import { useTranslation } from 'react-i18next';
import type { BlogPostListFP, GuideItemListFP } from '@repo/api-models';
import { type FC, useMemo } from 'react';

// common modules
import { getGuidesRouteLink } from '~/utils/links';
import { GuidesSlider } from '~/components/guides-slider';
import { useGuideListInfiniteQuery } from '~/api/guide';

// local modules
import { SectionLink } from './section-link';
import { TimelineSection } from './timeline-section';
import { description as descriptionCn, page as pageCn, title as titleCn } from './page.module.scss';

interface IndexPageProps {
  guidesFP: GuideItemListFP;
  blogPostFP: BlogPostListFP;
}

export const IndexPage: FC<IndexPageProps> = ({ blogPostFP, guidesFP }) => {
  const { t } = useTranslation();

  const guidesQuery = useGuideListInfiniteQuery(guidesFP);
  const guides = useMemo(
    () =>
      guidesQuery.data?.pages
        .map(page => page.data)
        .flat()
        .filter(val => !!val),
    [guidesQuery.data],
  );

  return (
    <div className={pageCn}>
      <div className={titleCn}>{t('INDEX_PAGE_TITLE')}</div>
      <div className={descriptionCn}>{t('INDEX_PAGE_DESCRIPTION')}</div>

      <SectionLink to={getGuidesRouteLink()}>{t('GUIDES_PAGE_TITLE')}</SectionLink>
      <GuidesSlider
        guides={guides}
        hasNextPage={guidesQuery.hasNextPage}
        pending={!guidesQuery.isFetched}
      />

      <TimelineSection blogPostFP={blogPostFP} />
    </div>
  );
};
