import type { Editor } from '@tiptap/react';
import { ChevronDownIcon, ListIcon, ListOrderedIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/DropdownMenu';
import { cn } from '@repo/ui/lib/utils';

import { useEditorSync } from '../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ShortcutKey } from './ShortcutKey';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * ListToolbarButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ListToolbarButton';

interface ListToolbarButtonProps {
  editor?: Editor | null;
}

const ListToolbarButton: FC<ListToolbarButtonProps> = ({ editor: providedEditor }) => {
  const editor = useTiptapEditor(providedEditor);
  const unorderedListIsActive = useEditorSync(editor, (e) => e.isActive('bulletList'), false);
  const orderedListIsActive = useEditorSync(editor, (e) => e.isActive('orderedList'), false);
  const disabled = useEditorSync(editor, (e) => e.isActive('codeBlock'), true);

  const handleStyleChange = (type: 'bulletList' | 'orderedList') => {
    if (type === 'bulletList') editor?.chain().focus().toggleBulletList().run();
    else if (type === 'orderedList') editor?.chain().focus().toggleOrderedList().run();
  };

  const getIconComponent = () => {
    if (unorderedListIsActive) return ListIcon;
    if (orderedListIsActive) return ListOrderedIcon;
    return ListIcon;
  };

  const Icon = getIconComponent();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton aria-label="Text styles" disabled={disabled} tooltip="Text styles">
          <Icon className={cn('size-4', { 'text-primary-11': unorderedListIsActive || orderedListIsActive })} />
          <ChevronDownIcon className="size-3" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem aria-label="Unordered List" onClick={() => handleStyleChange('bulletList')}>
          <ListIcon className={cn('size-4', { 'text-primary-11': unorderedListIsActive })} />
          <span>Unordered List</span>
          <ShortcutKey keys={['mod', 'alt', '1']} />
        </DropdownMenuItem>

        <DropdownMenuItem aria-label="Ordered List" onClick={() => handleStyleChange('orderedList')}>
          <ListOrderedIcon className={cn('size-4', { 'text-primary-11': orderedListIsActive })} />
          <span>Ordered List</span>
          <ShortcutKey keys={['mod', 'alt', '2']} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ListToolbarButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ListToolbarButton };
export type { ListToolbarButtonProps };
