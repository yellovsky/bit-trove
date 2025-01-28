// global modules
import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';

// local modules
import {
  blockContent as blockContentCn,
  blockLine as blockLineCn,
  date as dateCn,
  dateHolder as dateHolderCn,
  pending as pendingCn,
  timelineBlock as timelineBlockCn,
  timeline as timelineCn,
} from './timeline.module.scss';

interface TimelineProps extends PropsWithChildren {
  className?: string;
}

export const Timeline: FC<TimelineProps> = ({ children, className }) => (
  <div className={clsx(className, timelineCn)}>{children}</div>
);

interface TimelineDateProps extends PropsWithChildren {
  className?: string;
}

export const TimelineDate: FC<TimelineDateProps> = ({ children, className }) => (
  <div className={clsx(className, dateHolderCn)}>
    <div className={clsx(className, dateCn)}>{children}</div>
  </div>
);

interface TimelineDatePendingProps {
  className?: string;
}

export const TimelineDatePending: FC<TimelineDatePendingProps> = ({ className }) => (
  <div className={clsx(className, dateHolderCn, pendingCn)}>
    <div className={clsx(className, dateCn)}>&nbsp;</div>
  </div>
);

interface TimelineBlockProps extends PropsWithChildren {
  className?: string;
}

export const TimelineBlock: FC<TimelineBlockProps> = ({ children, className }) => (
  <div className={timelineBlockCn}>
    <div className={blockLineCn} />
    <div className={clsx(className, blockContentCn)}>{children}</div>
  </div>
);
