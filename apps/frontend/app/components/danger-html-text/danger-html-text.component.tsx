// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import { dangerHtml as dangerHtmlCn } from './danger-html-text.module.scss';

export interface DangerHTMLTextProps {
  text: string;
  className?: string;
}

export const DangerHTMLText: FC<DangerHTMLTextProps> = props => {
  const { className, text } = props;

  return (
    <div className={clsx(dangerHtmlCn, className)} dangerouslySetInnerHTML={{ __html: text }} />
  );
};
