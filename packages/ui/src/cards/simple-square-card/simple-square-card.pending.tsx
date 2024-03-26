// global modules
import cn from 'classnames';
import type { FC } from 'react';

// local modules
import {
  cardHolder as cardHolderCn,
  textHolder as textHolderCn,
  imageHolder as imageHolderCn,
} from './simple-square-card.module.scss';

export const SimpleSquareCardPending: FC<{ className?: string }> = ({ className }) => (
  <div className={cn(cardHolderCn, className)}>
    <div className={imageHolderCn} />
    <div className={textHolderCn}>&nbsp;</div>
  </div>
);
