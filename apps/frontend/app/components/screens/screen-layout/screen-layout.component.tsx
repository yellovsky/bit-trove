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
  title: ReactNode;
  message: ReactNode;
}

export const ScreenLayout: FC<ScreenLayoutProps> = props => (
  <div className={holderCn}>
    <div className={codeCn}>{props.code}</div>
    <div>
      <div className={titleCn}>{props.title}</div>
      <div className={messageCn}>{props.message}</div>
    </div>
  </div>
);
