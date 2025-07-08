import type { Editor } from '@tiptap/react';

// Editor-related types
export interface EditorProps {
  editor?: Editor | null;
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Toolbar-related types
export interface ToolbarProps {
  editor?: Editor | null;
  variant?: 'floating' | 'fixed';
  className?: string;
}

export interface ToolbarButtonProps {
  editor?: Editor | null;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  children?: React.ReactNode;
  className?: string;
}

// Button-related types
export interface BaseButtonProps {
  editor?: Editor | null;
  text?: string;
  hideWhenUnavailable?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

// Popover-related types
export interface PopoverProps {
  editor?: Editor | null;
  hideWhenUnavailable?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  autoOpenOnActive?: boolean;
}

// Hook-related types
export interface EditorHookOptions {
  editor?: Editor | null;
  disabled?: boolean;
  hideWhenUnavailable?: boolean;
}

// Utility types
export interface ShortcutKey {
  symbol: string;
  readable: string;
}

// Configuration types
export interface LanguageOption {
  label: string;
  value: string;
}

export interface ColorOption {
  label: string;
  value: string;
  border?: string;
}
