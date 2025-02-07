// global modules
import type { FC } from 'react';
import type { GuideItemSegment } from '@repo/api-models';

// common modules
import { getGuidesRouteLink } from '~/utils/links';
import { Slider } from '~/components/slider';
import { GuideSeeAllSlide, GuideSlide, GuideSlidePending } from '~/components/slides/guide-slide';

export interface GuidesSliderProps {
  hasNextPage?: boolean;
  pending?: boolean;
  guides?: GuideItemSegment[];
}

export const GuidesSlider: FC<GuidesSliderProps> = ({ hasNextPage, pending, guides }) => (
  <Slider className="mb-8">
    {pending || !guides?.length ? (
      <>
        <GuideSlidePending />
        <GuideSlidePending />
        <GuideSlidePending />
      </>
    ) : (
      <>
        {guides?.map(guide => <GuideSlide guide={guide} key={guide.id} />)}
        {!hasNextPage ? null : <GuideSeeAllSlide to={getGuidesRouteLink()} />}
      </>
    )}
  </Slider>
);
