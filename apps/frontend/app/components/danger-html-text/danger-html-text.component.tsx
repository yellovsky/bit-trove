// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import Markdown from 'react-markdown';

// local modules
import { dangerHtml as dangerHtmlCn } from './danger-html-text.module.scss';

interface DangerHTMLTextCommonProps {
  className?: string;
}

interface DangerHTMLTextHTMLProps extends DangerHTMLTextCommonProps {
  html: string;
  className?: string;
}

interface DangerHTMLTextMDProps extends DangerHTMLTextCommonProps {
  md: string;
  className?: string;
}

export type DangerHTMLTextProps = DangerHTMLTextHTMLProps | DangerHTMLTextMDProps;

export const DangerHTMLText: FC<DangerHTMLTextProps> = props => {
  const { className, ...rest } = props;

  return 'html' in rest ? (
    <div
      className={clsx(dangerHtmlCn, className)}
      dangerouslySetInnerHTML={{ __html: rest.html }}
    />
  ) : (
    <Markdown className={clsx(dangerHtmlCn, className)}>{rest.md}</Markdown>
  );
};
