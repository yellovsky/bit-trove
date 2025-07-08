import type { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

import { useEditorSync } from './use-editor-sync';

export interface CodeBlockHandlerProps {
  editor: Editor | null;
  onSetAttributes?: () => void;
  onCodeBlockActive?: () => void;
}

export const useCodeBlockHandler = (props: CodeBlockHandlerProps) => {
  const { editor, onSetAttributes, onCodeBlockActive } = props;
  const [language, updateLanguage] = useState<string>('');
  const [fileName, updateFileName] = useState<string>('');

  useEffect(() => {
    if (!editor) return;

    // Get attributes immediately on mount
    const attrs = editor.getAttributes('codeBlock');

    if (editor.isActive('codeBlock')) {
      updateLanguage(attrs.language || '');
      updateFileName(attrs.fileName || '');
      onCodeBlockActive?.();
    }
  }, [editor, onCodeBlockActive]);

  useEffect(() => {
    if (!editor) return;

    const updateCodeBlockState = () => {
      const attrs = editor.getAttributes('codeBlock');

      updateLanguage(attrs.language || '');
      updateFileName(attrs.fileName || '');

      if (editor.isActive('codeBlock')) onCodeBlockActive?.();
    };

    editor.on('selectionUpdate', updateCodeBlockState);

    return () => {
      editor.off('selectionUpdate', updateCodeBlockState);
    };
  }, [editor, onCodeBlockActive]);

  const setAttributes = (attrs: { language?: string; fileName?: string }) => {
    if (!editor) return;

    const attributes: { language?: string; fileName?: string } = {};

    attributes.language = 'language' in attrs ? attrs.language : language;
    attributes.fileName = 'fileName' in attrs ? attrs.fileName : fileName;

    // biome-ignore lint/suspicious/noExplicitAny: setCodeBlockAttributes is a method of clearCodeBlockFileName
    (editor.commands as any).setCodeBlockAttributes(attributes);
    onSetAttributes?.();
  };

  const clearFileName = () => {
    if (!editor) return;
    // biome-ignore lint/suspicious/noExplicitAny: clearCodeBlockFileName is a method of clearCodeBlockFileName
    (editor.commands as any).clearCodeBlockFileName();
    updateFileName('');
  };

  const isActive = useEditorSync(editor, (editor) => editor.isActive('codeBlock'), false);

  const setFileName = (fileName: string) => {
    updateFileName(fileName);
    setAttributes({ fileName });
  };

  const setLanguage = (language: string) => {
    updateLanguage(language);
    setAttributes({ language });
  };

  return {
    clearFileName,
    fileName,
    isActive,
    language,
    setAttributes,
    setFileName,
    setLanguage,
  };
};
