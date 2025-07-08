import { type Editor, isNodeSelection } from '@tiptap/react';
import { BanIcon, HighlighterIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';

import { isMarkInSchema } from '../../lib';
import { useMenuNavigation } from '../../model/hooks/use-menu-navigation';
import { useTiptapEditor } from '../../model/hooks/use-tiptap-editor';
import { ColorHighlightButton, canToggleHighlight } from '../Buttons/ColorHighlightButton';
import { Separator } from '../Toolbar/Separator';
import './ColorHighlightPopover.css';

import { type ComponentProps, type FC, useEffect, useMemo, useRef, useState } from 'react';

import { ToolbarButton } from '../Toolbar/ToolbarButton';

export interface ColorHighlightPopoverColor {
  label: string;
  value: string;
  border?: string;
}

export interface ColorHighlightPopoverContentProps {
  editor?: Editor | null;
  colors?: ColorHighlightPopoverColor[];
  onClose?: () => void;
}

export interface ColorHighlightPopoverProps extends Omit<ComponentProps<typeof ToolbarButton>, 'type'> {
  /** The TipTap editor instance. */
  editor?: Editor | null;

  /** The highlight colors to display in the popover. */
  colors?: ColorHighlightPopoverColor[];

  /** Whether to hide the highlight popover when unavailable. */
  hideWhenUnavailable?: boolean;
}

export const DEFAULT_HIGHLIGHT_COLORS: ColorHighlightPopoverColor[] = [
  {
    border: 'var(--tt-color-highlight-green-contrast)',
    label: 'Green',
    value: 'var(--tt-color-highlight-green)',
  },
  {
    border: 'var(--tt-color-highlight-blue-contrast)',
    label: 'Blue',
    value: 'var(--tt-color-highlight-blue)',
  },
  {
    border: 'var(--tt-color-highlight-red-contrast)',
    label: 'Red',
    value: 'var(--tt-color-highlight-red)',
  },
  {
    border: 'var(--tt-color-highlight-purple-contrast)',
    label: 'Purple',
    value: 'var(--tt-color-highlight-purple)',
  },
  {
    border: 'var(--tt-color-highlight-yellow-contrast)',
    label: 'Yellow',
    value: 'var(--tt-color-highlight-yellow)',
  },
];

export const ColorHighlightPopoverButton: FC<ComponentProps<typeof ToolbarButton>> = ({ children, ...props }) => (
  <ToolbarButton aria-label="Highlight text" tabIndex={-1} tooltip="Highlight" {...props}>
    {children || <HighlighterIcon strokeWidth={1} />}
  </ToolbarButton>
);

ColorHighlightPopoverButton.displayName = 'ColorHighlightPopoverButton';

export const ColorHighlightPopoverContent: FC<ColorHighlightPopoverContentProps> = ({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  onClose,
}) => {
  const editor = useTiptapEditor(providedEditor);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeHighlight = () => {
    if (!editor) return;
    editor.chain().focus().unsetMark('highlight').run();
    onClose?.();
  };

  const menuItems = [...colors, { label: 'Remove highlight', value: 'none' }];

  const { selectedIndex } = useMenuNavigation({
    autoSelectFirstItem: false,
    containerRef,
    items: menuItems,
    onClose,
    onSelect: (item) => {
      if (item.value === 'none') {
        removeHighlight();
      }
      onClose?.();
    },
    orientation: 'both',
  });

  return (
    // biome-ignore lint/a11y/noNoninteractiveTabindex: from tiptap samples
    <div className="tiptap-color-highlight-content" ref={containerRef} tabIndex={0}>
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <ColorHighlightButton
            aria-label={`${color.label} highlight color`}
            color={color.value}
            data-highlighted={selectedIndex === index}
            editor={editor}
            key={color.value}
            onClick={onClose}
            tabIndex={index === selectedIndex ? 0 : -1}
          />
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <ToolbarButton
          aria-label="Remove highlight"
          data-highlighted={selectedIndex === colors.length}
          onClick={removeHighlight}
          role="menuitem"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
        >
          <BanIcon strokeWidth={1} />
        </ToolbarButton>
      </div>
    </div>
  );
};

export function ColorHighlightPopover({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: ColorHighlightPopoverProps) {
  const editor = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const markAvailable = isMarkInSchema('highlight', editor);

  useEffect(() => {
    if (!editor) return;

    const updateIsDisabled = () => {
      let isDisabled = false;

      if (!markAvailable || !editor) {
        isDisabled = true;
      }

      const isInCompatibleContext =
        editor.isActive('code') || editor.isActive('codeBlock') || editor.isActive('imageUpload');

      if (isInCompatibleContext) {
        isDisabled = true;
      }

      setIsDisabled(isDisabled);
    };

    editor.on('selectionUpdate', updateIsDisabled);
    editor.on('update', updateIsDisabled);

    return () => {
      editor.off('selectionUpdate', updateIsDisabled);
      editor.off('update', updateIsDisabled);
    };
  }, [editor, markAvailable]);

  const isActive = editor?.isActive('highlight') ?? false;

  const shouldShow = useMemo(() => {
    if (!hideWhenUnavailable || !editor) return true;

    return !(isNodeSelection(editor.state.selection) || !canToggleHighlight(editor));
  }, [hideWhenUnavailable, editor]);

  if (!shouldShow || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton
          aria-pressed={isActive}
          data-active-state={isActive ? 'on' : 'off'}
          data-disabled={isDisabled}
          disabled={isDisabled}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Highlight colors">
        <ColorHighlightPopoverContent colors={colors} editor={editor} onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

ColorHighlightPopover.displayName = 'ColorHighlightPopover';
