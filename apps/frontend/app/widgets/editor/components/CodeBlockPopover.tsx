import { type Editor, isNodeSelection } from '@tiptap/react';
import { CodeSquareIcon } from 'lucide-react';
import { type ChangeEvent, type ComponentProps, type FC, useCallback, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/Select';
import { TextInput } from '@repo/ui/components/TextInput';

import { LANGUAGE_OPTIONS } from '../config/language-options';
import { useCodeBlockHandler } from '../hooks/use-code-block-handler';
import { useEditorSync } from '../hooks/use-editor-sync';
import { useTiptapEditor } from '../hooks/use-tiptap-editor';
import { getShortcutKey } from '../lib/get-shortcut-key';
import { isNodeInSchema } from '../lib/tiptap-utils';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * CodeBlockMain
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_MAIN_NAME = 'CodeBlockMain';

type CodeBlockMainProps = {
  editor?: Editor | null;
};

const CodeBlockMain: FC<CodeBlockMainProps> = ({ editor: providedEditor }) => {
  const editor = useTiptapEditor(providedEditor);
  const codeBlockHandler = useCodeBlockHandler({ editor: editor });

  const { language, fileName, setLanguage, setFileName } = codeBlockHandler;

  const languageInputId = 'codeblock-language-select';
  const fileNameInputId = 'codeblock-filename-input';

  const handleLanguageChange = (value: string) => setLanguage(value);
  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value);

  return (
    <div className="flex min-w-[260px] flex-col gap-3">
      <label className="font-medium text-muted-foreground text-xs" htmlFor={languageInputId}>
        Language
      </label>
      <Select onValueChange={handleLanguageChange} value={language}>
        <SelectTrigger className="w-full" id={languageInputId}>
          <SelectValue placeholder="Select language..." />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label className="font-medium text-muted-foreground text-xs" htmlFor={fileNameInputId}>
        File name (optional)
      </label>
      <TextInput
        autoCapitalize="off"
        autoCorrect="off"
        className="w-full"
        id={fileNameInputId}
        onChange={handleFileNameChange}
        placeholder="e.g. src/components/Button.tsx"
        spellCheck={false}
        type="text"
        value={fileName}
      />
    </div>
  );
};

CodeBlockMain.displayName = CODE_BLOCK_MAIN_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlockPopover
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_POPOVER_NAME = 'CodeBlockPopover';

interface CodeBlockPopoverProps extends ComponentProps<typeof ToolbarButton> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * Whether to hide the code block popover when unavailable.
   * @default false
   */
  hideWhenUnavailable?: boolean;

  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether to automatically open the popover when a code block is active.
   * @default true
   */
  autoOpenOnCodeBlockActive?: boolean;
}

const CodeBlockPopover: FC<CodeBlockPopoverProps> = ({
  editor: providedEditor,
  hideWhenUnavailable = false,
  onOpenChange,
  autoOpenOnCodeBlockActive = true,
  ...props
}) => {
  const editor = useTiptapEditor(providedEditor);

  const nodeInSchema = useEditorSync(editor, (e) => isNodeInSchema('codeBlock', e), false);
  const [isOpen, setIsOpen] = useState(false);

  const onSetAttributes = () => setIsOpen(false);
  const onCodeBlockActive = () => setIsOpen(autoOpenOnCodeBlockActive);
  useCodeBlockHandler({ editor: editor, onCodeBlockActive, onSetAttributes });

  const isDisabled = useEditorSync(
    editor,
    (e) => {
      if (!e) return true;
      try {
        return !e.can().toggleNode('codeBlock', 'paragraph');
      } catch {
        return true;
      }
    },
    true
  );

  const canToggle = useEditorSync(
    editor,
    (e) => {
      if (!e) return false;
      try {
        return e.can().toggleNode('codeBlock', 'paragraph');
      } catch {
        return false;
      }
    },
    false
  );

  const isActive = useEditorSync(editor, (e) => e?.isActive('codeBlock') || false, false);

  const handleOnOpenChange = useCallback(
    (nextIsOpen: boolean) => {
      setIsOpen(nextIsOpen);
      onOpenChange?.(nextIsOpen);
    },
    [onOpenChange]
  );

  const show = useMemo(() => {
    if (!nodeInSchema || !editor) return false;
    if (hideWhenUnavailable && (isNodeSelection(editor.state.selection) || !canToggle)) return false;
    return true;
  }, [nodeInSchema, hideWhenUnavailable, editor, canToggle]);

  if (!show || !editor || !editor.isEditable) return null;

  return (
    <Popover onOpenChange={handleOnOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <CodeBlockButton disabled={isDisabled} isActive={isActive} {...props} />
      </PopoverTrigger>

      <PopoverContent className="p-3">
        <CodeBlockMain editor={editor} />
      </PopoverContent>
    </Popover>
  );
};

CodeBlockPopover.displayName = CODE_BLOCK_POPOVER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlockButton
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_BUTTON_NAME = 'CodeBlockButton';

type CodeBlockButtonProps = ComponentProps<typeof ToolbarButton>;

const CodeBlockButton: FC<CodeBlockButtonProps> = (props) => {
  const { disabled, onClick, children, ...buttonProps } = props;
  const editor = useTiptapEditor();

  const canToggle = useEditorSync(
    editor,
    (e) => {
      if (!e) return false;
      try {
        return e.can().toggleNode('codeBlock', 'paragraph');
      } catch {
        return false;
      }
    },
    false
  );
  const isDisabled = useEditorSync(editor, (e) => !e || disabled || !canToggle, false);
  const isActive = useEditorSync(editor, (e) => e?.isActive('codeBlock') || false, false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented && !isDisabled && editor) {
        editor.chain().focus().toggleNode('codeBlock', 'paragraph').run();
      }
    },
    [onClick, isDisabled, editor]
  );

  const shortcutKeys = ['mod', 'C'];
  const label = 'Code Block';

  if (!editor || !editor.isEditable) return null;

  const tooltip = [label, shortcutKeys?.map((s) => getShortcutKey(s).symbol).join(' ')].filter(Boolean).join(' ');

  return (
    <ToolbarButton
      aria-label={label}
      disabled={isDisabled}
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || <CodeSquareIcon strokeWidth={isActive ? 2 : 1} />}
    </ToolbarButton>
  );
};

CodeBlockButton.displayName = CODE_BLOCK_BUTTON_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CodeBlockButton, CodeBlockMain, CodeBlockPopover };

export type { CodeBlockButtonProps, CodeBlockMainProps, CodeBlockPopoverProps };
