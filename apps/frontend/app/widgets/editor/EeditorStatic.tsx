// global modules
// global modules

import { TypographyStylesProvider, type TypographyStylesProviderProps } from '@mantine/core';
import type { Extensions, JSONContent } from '@tiptap/core';
import type { CSSProperties, FC } from 'react';

// local modules
import { Editor } from './Editor';
import { useEditor } from './editor.helpers';
import { StaticContent } from './StaticContent';
import './code-block.css';

interface EditorFP extends Omit<TypographyStylesProviderProps, 'content'> {
  className?: string;
  style?: CSSProperties;
  extensions?: Extensions;
  content: string | JSONContent;
}

export const EditorStatic: FC<EditorFP> = ({ className, style, extensions, content, ...rest }) => {
  const editor = useEditor({
    content: content,
    editable: false,
    extensions: extensions,
    immediatelyRender: false,
  });

  return (
    <TypographyStylesProvider {...rest}>
      {!editor ? (
        <StaticContent className={className} content={content} extensions={extensions} style={style} />
      ) : (
        <Editor className={className} editor={editor} />
      )}
    </TypographyStylesProvider>
  );
};
