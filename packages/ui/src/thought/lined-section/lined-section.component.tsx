// global modules
import cn from 'classnames';
import { forwardRef, type PropsWithChildren } from 'react';

// local modules
import {
  topLine as topLineCn,
  bottomLine as bottomLineCn,
  withMarker as withMarkerCn,
  linedColumn as linedColumnCn,
  linedSection as linedSectionCn,
  markerHolder as markerHolderCn,
  contentColumn as contentColumnCn,
} from './lined-section.module.scss';

interface LinedSectionProps extends PropsWithChildren {
  marker?: boolean;
}

export const LinedSection = forwardRef<HTMLDivElement, LinedSectionProps>(
  ({ marker, children }, ref) => (
    <div className={linedSectionCn} ref={ref}>
      <div className={cn(linedColumnCn, marker && withMarkerCn)}>
        <div className={topLineCn} />
        {marker ? <div className={markerHolderCn} /> : null}
        <div className={bottomLineCn} />
      </div>
      <div className={contentColumnCn}>{children}</div>
    </div>
  )
);
