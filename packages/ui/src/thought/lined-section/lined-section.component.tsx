// global modules
import cn from 'classnames';
import { forwardRef, type PropsWithChildren } from 'react';

// local modules
import {
  bottomLine as bottomLineCn,
  contentColumn as contentColumnCn,
  linedColumn as linedColumnCn,
  linedSection as linedSectionCn,
  markerHolder as markerHolderCn,
  topLine as topLineCn,
  withMarker as withMarkerCn,
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
