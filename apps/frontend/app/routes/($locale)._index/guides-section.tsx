// global modules
import type { FC } from 'react';
import type { GuideItemListFP } from '@repo/api-models';
import { useTranslation } from 'react-i18next';

// common modules
import { getGuidesRouteLink } from '~/utils/links';
import { Slider } from '~/components/slider';
import { useGuideListInfiniteQuery } from '~/api/guide';
import { GuideSeeAllSlide, GuideSlide, GuideSlidePending } from '~/components/slides/guide-slide';

// local modules
import { SectionLink } from './section-link';

interface GuidesSectionProps {
  guidesFP: GuideItemListFP;
}

export const GuidesSection: FC<GuidesSectionProps> = ({ guidesFP }) => {
  const { t } = useTranslation();

  const guidesQuery = useGuideListInfiniteQuery(guidesFP);

  const guides = guidesQuery.data?.pages
    .map(page => page.data)
    .flat()
    .filter(val => !!val);

  return (
    <>
      <SectionLink to={getGuidesRouteLink()}>{t('GUIDES_PAGE_TITLE')}</SectionLink>

      <Slider className="mb-8">
        {guides?.map(guide => <GuideSlide guide={guide} key={guide.id} />)}

        {guidesQuery.isFetched ? null : (
          <>
            <GuideSlidePending />
            <GuideSlidePending />
            <GuideSlidePending />
          </>
        )}

        {!guidesQuery.hasNextPage ? null : <GuideSeeAllSlide to={getGuidesRouteLink()} />}
      </Slider>
    </>
  );
};
