// global modules
import type { FC } from 'react';
import type { TutorialSegment } from '@repo/api-models';

// common modules
import { getTutorialsRouteLink } from '~/utils/links';
import { Slider } from '~/components/slider';
import {
  TutorialSeeAllSlide,
  TutorialSlide,
  TutorialSlidePending,
} from '~/components/slides/tutorial-slide';

export interface TutorialsSliderProps {
  hasNextPage?: boolean;
  pending?: boolean;
  tutorials?: TutorialSegment[];
}

export const TutorialsSlider: FC<TutorialsSliderProps> = ({ hasNextPage, pending, tutorials }) => (
  <Slider className="mb-8">
    {pending || !tutorials?.length ? (
      <>
        <TutorialSlidePending />
        <TutorialSlidePending />
        <TutorialSlidePending />
      </>
    ) : (
      <>
        {tutorials?.map(tutorial => <TutorialSlide key={tutorial.id} tutorial={tutorial} />)}
        {!hasNextPage ? null : <TutorialSeeAllSlide to={getTutorialsRouteLink()} />}
      </>
    )}
  </Slider>
);
