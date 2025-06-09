import type { Extensions, JSONContent } from '@tiptap/core';
import { generateHTML, generateJSON } from '@tiptap/html';
import type { CSSProperties, FC } from 'react';

import { escapeContentCodeTags, getExtensions } from './editor.helpers';

interface StaticContentProps {
  className?: string;
  style?: CSSProperties;
  extensions?: Extensions;
  content: string | JSONContent;
}

export const StaticContent: FC<StaticContentProps> = (props) => {
  const extensions = getExtensions(props.extensions);
  const withoutContentTags = escapeContentCodeTags(props.content);
  const json =
    typeof withoutContentTags === 'string' ? generateJSON(withoutContentTags, extensions) : withoutContentTags;
  const html = generateHTML(json, extensions);

  return (
    <div
    // className={cx(props.className, styles.content)}
    // data-mantine-color-scheme={'dark'}
    // style={{ colorScheme: 'dark' }}
    >
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: expected html
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
