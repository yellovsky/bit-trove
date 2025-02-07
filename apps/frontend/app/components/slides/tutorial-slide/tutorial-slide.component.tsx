// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import type { TutorialSegment } from '@repo/api-models';

// common modules
import { getTutorialRouteLink } from '~/utils/links';
import { Link } from '~/components/link';
import { useDateFormatter } from '~/utils/formatter';

// local modules
import { TutorialSlidePending } from './tutorial-slide.pending';

import {
  baseSlide as baseSlideCn,
  date as dateCn,
  description as descriptionCn,
  slide as slideCn,
  title as titleCn,
} from './tutorial-slide.module.scss';

interface TutorialSlideProps {
  className?: string;
  pending?: boolean;
  tutorial: TutorialSegment;
}

export const TutorialSlide: FC<TutorialSlideProps> = props => {
  const dateFormatter = useDateFormatter();

  return props.pending ? (
    <TutorialSlidePending />
  ) : (
    <Link
      className={clsx(props.className, slideCn, baseSlideCn)}
      to={getTutorialRouteLink(props.tutorial)}
      variant="plain"
    >
      <div>
        <div className={titleCn}>{props.tutorial.title}</div>
        <div className={dateCn}>
          {dateFormatter.format(new Date(props.tutorial.published_at || props.tutorial.created_at))}
        </div>
      </div>

      <div className={descriptionCn}>{props.tutorial.short_description}</div>
    </Link>
  );
};
