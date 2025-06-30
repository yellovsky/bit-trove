import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import {
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HeadingIcon,
} from 'lucide-react';
import type { FC } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/DropdownMenu';
import { cn } from '@repo/ui/lib/utils';

import { useEditorSync } from '../hooks/use-editor-sync';
import { useTiptapEditor } from '../hooks/use-tiptap-editor';
import { ShortcutKey } from './ShortcutKey';
import { ToolbarButton } from './ToolbarButton';

interface SectionOneProps {
  editor?: Editor;
  levels?: Level[];
}

const levelIcons = {
  1: Heading1Icon,
  2: Heading2Icon,
  3: Heading3Icon,
  4: Heading4Icon,
  5: Heading5Icon,
  6: Heading6Icon,
};

const headingNames = {
  1: 'Heading 1',
  2: 'Heading 2',
  3: 'Heading 3',
  4: 'Heading 4',
  5: 'Heading 5',
  6: 'Heading 6',
};

const shortcutKeys = {
  1: ['mod', 'alt', '1'],
  2: ['mod', 'alt', '2'],
  3: ['mod', 'alt', '3'],
  4: ['mod', 'alt', '4'],
  5: ['mod', 'alt', '5'],
  6: ['mod', 'alt', '6'],
};

interface HeadingMenuItemProps {
  level: Level;
  editor: Editor | null;
}

const HeadingMenuItem = ({ level, editor }: HeadingMenuItemProps) => {
  const isActive = useEditorSync(editor, (e) => e.isActive('heading', { level }), false);
  const handleClick = () => editor?.chain().focus().toggleHeading({ level }).run();
  const Icon = levelIcons[level];

  return (
    <DropdownMenuItem aria-label={headingNames[level]} onClick={handleClick}>
      <Icon className={cn('size-4', { 'text-primary-11': isActive })} />
      <span>{headingNames[level]}</span>
      <ShortcutKey keys={shortcutKeys[level]} />
    </DropdownMenuItem>
  );
};

const getDisabled = (editor: Editor | null, levels: Level[]) =>
  !levels.some((level) => editor?.can().toggleNode('heading', 'paragraph', { level }));

const getActiveLevel = (editor: Editor | null, levels: Level[]) =>
  levels.find((level) => editor?.isActive('heading', { level }));

export const HeadingToolbarSection: FC<SectionOneProps> = ({ editor: providedEditor, levels = [1, 2, 3, 4, 5, 6] }) => {
  const editor = useTiptapEditor(providedEditor);
  const activeLevel = useEditorSync(editor, (e) => getActiveLevel(e, levels), null);
  const ActiveIcon = activeLevel ? levelIcons[activeLevel] : HeadingIcon;
  const disabled = useEditorSync(editor, (e) => getDisabled(e, levels), true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton aria-label="Text styles" disabled={disabled} tooltip="Text styles">
          {
            <ActiveIcon
              className={cn('size-4', { 'text-primary-11': activeLevel })}
              strokeWidth={activeLevel ? 2 : 1}
            />
          }
          <ChevronDownIcon className="size-3" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-full">
        {levels.map((level) => (
          <HeadingMenuItem editor={editor} key={level} level={level} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

HeadingToolbarSection.displayName = 'HeadingToolbarSection';
