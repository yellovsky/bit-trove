// global modules
import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

// local modules
import { classNamesLookup, type TitleStyledAs } from './title.component';
import { title as titleCn, pending as pendingCn } from './title.module.scss';

interface TitlePendingProps extends HTMLAttributes<HTMLDivElement> {
  styledAs: TitleStyledAs;
}

export const TitlePending: FC<TitlePendingProps> = ({ styledAs, className, ...rest }) => (
  <div {...rest} className={cn(titleCn, pendingCn, className, classNamesLookup[styledAs])}>
    &nbsp;
  </div>
);