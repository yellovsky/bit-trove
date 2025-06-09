// global modules
// global modules

import { TypographyStylesProvider } from '@mantine/core';
import type { Extensions, JSONContent } from '@tiptap/core';
import type { CSSProperties, FC } from 'react';

// local modules
import { Editor } from './Editor';
import { useEditor } from './editor.helpers';
import { StaticContent } from './StaticContent';
import './code-block.css';

interface EditorFP {
  className?: string;
  style?: CSSProperties;
  extensions?: Extensions;
  content: string | JSONContent;
}

export const EditorStatic: FC<EditorFP> = (props) => {
  const editor = useEditor({
    content: props.content,
    editable: false,
    extensions: props.extensions,
    immediatelyRender: false,
  });

  return (
    <TypographyStylesProvider>
      {!editor ? <StaticContent {...props} /> : <Editor className={props.className} editor={editor} />}
    </TypographyStylesProvider>
  );
};
