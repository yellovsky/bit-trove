import type { Node } from '@tiptap/pm/model';
import type { Editor } from '@tiptap/react';
import { BanIcon, HighlighterIcon } from 'lucide-react';
import { type ComponentProps, type FC, useEffect, useRef, useState } from 'react';

import { IconButton, type IconButtonProps } from '@repo/ui/components/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { cn } from '@repo/ui/lib/utils';

import { isMarkInSchema } from '../lib';
import {
  canToggleHighlight,
  HIGHLIGHT_COLORS,
  isColorHighlightButtonDisabled,
  isHighlightActive,
  shouldShowColorHighlightButton,
  shouldShowColorHighlightPopover,
  toggleHighlight,
} from '../lib/color-highlight';
import { useEditorSync } from '../model';
import { useMenuNavigation } from '../model/hooks/use-menu-navigation';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { Separator } from './Separator';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * ColorHighlightButton
 * -----------------------------------------------------------------------------------------------*/
const COLOR_HIGHLIGHT_BUTTON_NAME = 'ColorHighlightButton';

interface ColorHighlightButtonProps extends Omit<IconButtonProps, 'type'> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * The node to apply highlight to
   */
  node?: Node | null;

  /**
   * The position of the node in the document
   */
  nodePos?: number | null;

  /**
   * The color to apply when toggling the highlight.
   * If not provided, it will use the default color from the extension.
   */
  color: string;

  /**
   * Optional text to display alongside the icon.
   */
  text?: string;

  /**
   * Whether the button should hide when the mark is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;

  /**
   * Called when the highlight is applied.
   */
  onApplied?: (color: string) => void;
}

/**
 * Custom hook to manage highlight button state
 */
export const useHighlightState = (
  editor: Editor | null,
  color: string,
  disabled = false,
  hideWhenUnavailable = false
) => {
  const highlightInSchema = useEditorSync(editor, (e) => isMarkInSchema('highlight', e), false);
  const isDisabled = useEditorSync(editor, (e) => isColorHighlightButtonDisabled(e, disabled), false);
  const isActive = useEditorSync(editor, (e) => isHighlightActive(e, color), false);
  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowColorHighlightButton(e, hideWhenUnavailable, highlightInSchema),
    false
  );
  return { highlightInSchema, isActive, isDisabled, shouldShow };
};

/**
 * ColorHighlightButton component for TipTap editor
 */
const ColorHighlightButton: FC<ColorHighlightButtonProps> = ({
  editor: providedEditor,
  node,
  nodePos,
  color,
  text,
  hideWhenUnavailable = false,
  disabled,
  onClick,
  onApplied,
  children,
  style,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);
  const { isDisabled, isActive, shouldShow } = useHighlightState(editor, color, disabled, hideWhenUnavailable);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (!e.defaultPrevented && !isDisabled && editor) {
      toggleHighlight(editor, color, node, nodePos);
      onApplied?.(color);
    }
  };

  const buttonStyle = { ...style, '--highlight-color': color } as React.CSSProperties;

  if (!shouldShow || !editor || !editor.isEditable) return null;

  return (
    <IconButton
      aria-label={`${color} highlight color`}
      disabled={isDisabled}
      onClick={handleClick}
      style={buttonStyle}
      tabIndex={-1}
      type="button"
      variant={isActive ? 'soft' : 'ghost'}
      {...buttonProps}
    >
      {children || (
        <>
          <span
            className={cn(
              '-mx-0.5 relative size-5 rounded-full bg-(--highlight-color) transition-transform duration-200'
            )}
            style={{ '--highlight-color': color } as React.CSSProperties}
          />
          {text && <span>{text}</span>}
        </>
      )}
    </IconButton>
  );
};

ColorHighlightButton.displayName = COLOR_HIGHLIGHT_BUTTON_NAME;

/* -------------------------------------------------------------------------------------------------
 * ColorHighlightPopoverButton
 * -----------------------------------------------------------------------------------------------*/
const COLOR_HIGHLIGHT_POPOVER_BUTTON_NAME = 'ColorHighlightPopoverButton';

type ColorHighlightPopoverButtonProps = ComponentProps<typeof ToolbarButton>;

const ColorHighlightPopoverButton: FC<ColorHighlightPopoverButtonProps> = ({ children, ...props }) => (
  <ToolbarButton aria-label="Highlight text" icon tabIndex={-1} tooltip="Highlight" {...props}>
    {children || <HighlighterIcon />}
  </ToolbarButton>
);

ColorHighlightPopoverButton.displayName = COLOR_HIGHLIGHT_POPOVER_BUTTON_NAME;

/* -------------------------------------------------------------------------------------------------
 * ColorHighlightPopoverContent
 * -----------------------------------------------------------------------------------------------*/
const COLOR_HIGHLIGHT_POPOVER_CONTENT_NAME = 'ColorHighlightPopoverContent';

interface ColorHighlightPopoverColor {
  label: string;
  value: string;
  border?: string;
}

interface ColorHighlightPopoverContentProps {
  editor?: Editor | null;
  colors?: ColorHighlightPopoverColor[];
  onClose?: () => void;
}

const ColorHighlightPopoverContent: FC<ColorHighlightPopoverContentProps> = ({
  editor: providedEditor,
  colors = HIGHLIGHT_COLORS,
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
    <div className="flex items-center gap-0.5 outline-none" ref={containerRef} tabIndex={0}>
      <div data-orientation="horizontal">
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

      <div>
        <ToolbarButton
          aria-label="Remove highlight"
          data-highlighted={selectedIndex === colors.length}
          onClick={removeHighlight}
          role="menuitem"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
        >
          <BanIcon />
        </ToolbarButton>
      </div>
    </div>
  );
};

ColorHighlightPopoverContent.displayName = COLOR_HIGHLIGHT_POPOVER_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * ColorHighlightPopover
 * -----------------------------------------------------------------------------------------------*/
const COLOR_HIGHLIGHT_POPOVER_NAME = 'ColorHighlightPopover';

interface ColorHighlightPopoverProps extends Omit<ComponentProps<typeof ToolbarButton>, 'type'> {
  /** The TipTap editor instance. */
  editor?: Editor | null;

  /** The highlight colors to display in the popover. */
  colors?: ColorHighlightPopoverColor[];

  /** Whether to hide the highlight popover when unavailable. */
  hideWhenUnavailable?: boolean;
}

const useColorHighlightPopover = (editor: Editor | null, hideWhenUnavailable: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const nodeInSchema = useEditorSync(editor, (e) => isMarkInSchema('highlight', e), false);
  const markAvailable = useEditorSync(editor, (e) => isMarkInSchema('highlight', e), false);
  const canToggle = useEditorSync(editor, (e) => canToggleHighlight(e), false);
  const isActive = useEditorSync(editor, (e) => e.isActive('highlight'), false);

  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowColorHighlightPopover({ canToggle, editor: e, hideWhenUnavailable, nodeInSchema }),
    false
  );

  useEffect(() => {
    if (!editor) return;

    const updateIsDisabled = () => {
      let isDisabled = false;

      if (!markAvailable || !editor) isDisabled = true;

      const isInCompatibleContext =
        editor.isActive('code') || editor.isActive('codeBlock') || editor.isActive('imageUpload');

      if (isInCompatibleContext) isDisabled = true;

      setIsDisabled(isDisabled);
    };

    editor.on('selectionUpdate', updateIsDisabled);
    editor.on('update', updateIsDisabled);

    return () => {
      editor.off('selectionUpdate', updateIsDisabled);
      editor.off('update', updateIsDisabled);
    };
  }, [editor, markAvailable]);

  return { isActive, isDisabled, isOpen, setIsOpen, shouldShow };
};

const ColorHighlightPopover: FC<ColorHighlightPopoverProps> = ({
  editor: providedEditor,
  colors = HIGHLIGHT_COLORS,
  hideWhenUnavailable = false,
  ...props
}) => {
  const editor = useTiptapEditor(providedEditor);

  const { isActive, isOpen, isDisabled, shouldShow, setIsOpen } = useColorHighlightPopover(editor, hideWhenUnavailable);

  if (!shouldShow) return null;

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton disabled={isDisabled} isActive={isActive} {...props} />
      </PopoverTrigger>

      <PopoverContent aria-label="Highlight colors">
        <ColorHighlightPopoverContent colors={colors} editor={editor} onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

ColorHighlightPopover.displayName = COLOR_HIGHLIGHT_POPOVER_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ColorHighlightPopoverButton, ColorHighlightPopover, ColorHighlightPopoverContent };

export type {
  ColorHighlightPopoverButtonProps,
  ColorHighlightPopoverProps,
  ColorHighlightPopoverColor,
  ColorHighlightPopoverContentProps,
};
