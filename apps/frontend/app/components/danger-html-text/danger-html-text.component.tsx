// global modules
import clsx from 'clsx';
import { useNavigate } from '@remix-run/react';
import { type FC, useEffect, useId } from 'react';
import Markdown, { type Components } from 'react-markdown';

// local modules
import { dangerHtml as dangerHtmlCn } from './danger-html-text.module.scss';
import { MarkdownLink } from './danger-html-text.markdown-link';

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

const components: Partial<Components> = { a: MarkdownLink };

export const DangerHTMLText: FC<DangerHTMLTextProps> = ({ className, ...rest }) => {
  const id = useId();
  const navigate = useNavigate();

  const htmlOrMD = 'html' in rest ? rest.html : rest.md;

  useEffect(() => {
    const anchors = document.querySelectorAll(`#${CSS.escape(id)} a`);

    const handleClick = (event: MouseEvent) => {
      const target = event?.target;
      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute('href');
      if (href?.startsWith(location.origin)) {
        event.stopPropagation();
        event.preventDefault();
        navigate(href);
      }
    };

    anchors.forEach(el => {
      if (el instanceof HTMLAnchorElement) el.addEventListener('click', handleClick);
    });

    return () =>
      anchors.forEach(el => {
        if (el instanceof HTMLAnchorElement) el.removeEventListener('click', handleClick);
      });
  }, [htmlOrMD]);

  return (
    <div className={clsx(dangerHtmlCn, className)} id={id}>
      {'html' in rest ? (
        <div dangerouslySetInnerHTML={{ __html: rest.html }} />
      ) : (
        <Markdown components={components}>{rest.md}</Markdown>
      )}
    </div>
  );
};
