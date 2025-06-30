import { type Editor, isNodeSelection } from '@tiptap/react';
import { ExternalLinkIcon, LinkIcon, Trash2Icon } from 'lucide-react';
import {
  type ComponentProps,
  type Dispatch,
  type FC,
  type KeyboardEventHandler,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { TextInput } from '@repo/ui/components/TextInput';

import { useEditorSync } from '../hooks/use-editor-sync';
import { useTiptapEditor } from '../hooks/use-tiptap-editor';
import { isMarkInSchema, sanitizeUrl } from '../lib/tiptap-utils';
import { ToolbarButton } from './ToolbarButton';

export interface LinkHandlerProps {
  editor: Editor | null;
  onSetLink?: () => void;
  onLinkActive?: () => void;
}

export interface LinkMainProps {
  url: string;
  setUrl: Dispatch<SetStateAction<string | null>>;
  setLink: () => void;
  removeLink: () => void;
  isActive: boolean;
}

export const useLinkHandler = (props: LinkHandlerProps) => {
  const { editor, onSetLink, onLinkActive } = props;
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) return;

    // Get URL immediately on mount
    const { href } = editor.getAttributes('link');

    if (editor.isActive('link') && url === null) {
      setUrl(href || '');
      onLinkActive?.();
    }
  }, [editor, onLinkActive, url]);

  useEffect(() => {
    if (!editor) return;

    const updateLinkState = () => {
      const { href } = editor.getAttributes('link');
      setUrl(href || '');
      if (editor.isActive('link') && url !== null) onLinkActive?.();
    };

    editor.on('selectionUpdate', updateLinkState);

    return () => {
      editor.off('selectionUpdate', updateLinkState);
    };
  }, [editor, onLinkActive, url]);

  const setLink = () => {
    if (!url || !editor) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setUrl(null);
    onSetLink?.();
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().setMeta('preventAutolink', true).run();
    setUrl('');
  };

  const isActive = useEditorSync(editor, (e) => e.isActive('link'), false);

  return {
    isActive,
    removeLink,
    setLink,
    setUrl,
    url: url || '',
  };
};

export const LinkButton: FC<ComponentProps<typeof ToolbarButton>> = ({ className, children, ...props }) => (
  <ToolbarButton aria-label="Link" className={className} tabIndex={-1} tooltip="Link" type="button" {...props}>
    {children || <LinkIcon className="size-4" strokeWidth={props.isActive ? 2 : 1} />}
  </ToolbarButton>
);

export const LinkContent: FC<{ editor?: Editor | null }> = ({ editor: providedEditor }) => {
  const editor = useTiptapEditor(providedEditor);
  const linkHandler = useLinkHandler({ editor: editor });
  return <LinkMain {...linkHandler} />;
};

const LinkMain: FC<LinkMainProps> = ({ url, setUrl, setLink, removeLink, isActive }) => {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLink();
    }
  };

  const handleOpenLink = () => {
    if (!url) return;
    const safeUrl = sanitizeUrl(url, window.location.href);
    if (safeUrl !== '#') window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <TextInput
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste a link..."
        type="url"
        value={url}
      />

      <ToolbarButton disabled={!url && !isActive} onClick={handleOpenLink} title="Open in new window" type="button">
        <ExternalLinkIcon />
      </ToolbarButton>

      <ToolbarButton disabled={!url && !isActive} onClick={removeLink} title="Remove link" type="button">
        <Trash2Icon />
      </ToolbarButton>
    </>
  );
};

export interface LinkPopoverProps extends ComponentProps<typeof ToolbarButton> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * Whether to hide the link popover.
   * @default false
   */
  hideWhenUnavailable?: boolean;

  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether to automatically open the popover when a link is active.
   * @default true
   */
  autoOpenOnLinkActive?: boolean;
}

export const LinkPopover: FC<LinkPopoverProps> = ({
  editor: providedEditor,
  hideWhenUnavailable = false,
  onOpenChange,
  autoOpenOnLinkActive = true,
  ...props
}) => {
  const editor = useTiptapEditor(providedEditor);

  const linkInSchema = isMarkInSchema('link', editor);
  const [isOpen, setIsOpen] = useState(false);

  const onSetLink = () => setIsOpen(false);
  const onLinkActive = () => setIsOpen(autoOpenOnLinkActive);
  const linkHandler = useLinkHandler({ editor: editor, onLinkActive, onSetLink });

  const isDisabled = useEditorSync(
    editor,
    (e) => {
      if (!e) return true;
      if (e.isActive('codeBlock')) return true;
      return !e.can().setLink?.({ href: '' });
    },
    true
  );

  const canSetLink = useMemo(() => {
    if (!editor) return false;
    try {
      return editor.can().setMark('link');
    } catch {
      return false;
    }
  }, [editor]);

  const isActive = useEditorSync(editor, (e) => e.isActive('link'), false);

  const handleOnOpenChange = useCallback(
    (nextIsOpen: boolean) => {
      setIsOpen(nextIsOpen);
      onOpenChange?.(nextIsOpen);
    },
    [onOpenChange]
  );

  const show = useMemo(() => {
    if (!linkInSchema || !editor) return false;
    if (hideWhenUnavailable && (isNodeSelection(editor.state.selection) || !canSetLink)) return false;
    return true;
  }, [linkInSchema, hideWhenUnavailable, editor, canSetLink]);

  if (!show || !editor || !editor.isEditable) return null;

  return (
    <Popover onOpenChange={handleOnOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <LinkButton disabled={isDisabled} isActive={isActive} {...props} />
      </PopoverTrigger>

      <PopoverContent className="flex items-center gap-1 overflow-hidden p-1">
        <LinkMain {...linkHandler} />
      </PopoverContent>
    </Popover>
  );
};

LinkButton.displayName = 'LinkButton';
