// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import type { GuideItemSegment } from '@repo/api-models';

// common modules
import { getGuideRouteLink } from '~/utils/links';
import { Link } from '~/components/link';
import { useDateFormatter } from '~/utils/formatter';

// local modules
import { GuideSlidePending } from './guide-slide.pending';

import {
  baseSlide as baseSlideCn,
  date as dateCn,
  description as descriptionCn,
  slide as slideCn,
  title as titleCn,
} from './guide-slide.module.scss';

interface GuideSlideProps {
  className?: string;
  pending?: boolean;
  guide: GuideItemSegment;
}

export const GuideSlide: FC<GuideSlideProps> = props => {
  const dateFormatter = useDateFormatter();

  return props.pending ? (
    <GuideSlidePending />
  ) : (
    <Link
      className={clsx(props.className, slideCn, baseSlideCn)}
      to={getGuideRouteLink(props.guide)}
      variant="plain"
    >
      <div>
        <div className={titleCn}>{props.guide.title}</div>
        <div className={dateCn}>
          {dateFormatter.format(new Date(props.guide.published_at || props.guide.created_at))}
        </div>
      </div>

      <div className={descriptionCn}>{props.guide.short_description}</div>
    </Link>
  );
};
