// global modules
import type { FC, ReactNode } from 'react';

// local modules
import {
  code as codeCn,
  holder as holderCn,
  message as messageCn,
  title as titleCn,
} from './screen-layout.module.scss';

interface ScreenLayoutProps {
  code: ReactNode;
  title?: ReactNode;
  message?: ReactNode;
}

export const ScreenLayout: FC<ScreenLayoutProps> = props => (
  <div className={holderCn}>
    <div className={codeCn}>{props.code}</div>

    {!props.message && !props.title ? null : (
      <div>
        {!props.title ? null : <div className={titleCn}>{props.title}</div>}
        {!props.message ? null : <div className={messageCn}>{props.message}</div>}
      </div>
    )}
  </div>
);
