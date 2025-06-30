import { EditorContent, EditorContext, type Editor as TipTapEditor } from '@tiptap/react';
import { ArrowLeftIcon, HighlighterIcon, LinkIcon } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

import { Button } from '@repo/ui/components/Button';
import { useCursorVisibility } from '@repo/ui/hooks/use-cursor-visibility';
import { useMobile } from '@repo/ui/hooks/use-mobile';
import { useWindowSize } from '@repo/ui/hooks/use-window-size';

import { BlockquoteButton } from './components/BlockquoteButton';
import CodeBlockButton from './components/CodeBlockButton';
import { HeadingToolbarSection } from './components/HeadingToolbarSection';
import { LinkButton, LinkContent, LinkPopover } from './components/LinkPopover';
import { ListToolbarButton } from './components/ListToolbarButton';
import MarkButton from './components/MarkButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from './components/Toolbar';
import { UndoRedoButton } from './components/UndoRedoButton';
import './Editor.css';

import ColorHighlightPopover, {
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from './components/ColorHighlightPopover';

interface MainToolbarContentProps {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}

const MainToolbarContent: FC<MainToolbarContentProps> = ({ onHighlighterClick, onLinkClick, isMobile }) => {
  return (
    <>
      {/* <Spacer /> */}

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingToolbarSection levels={[1, 2, 3]} />
        <ListToolbarButton />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="underline" />
        <MarkButton type="strike" />
        <MarkButton type="code" />

        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      {/* <ToolbarSeparator /> */}

      {/* <ToolbarGroup> */}
      {/* <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" /> */}
      {/* </ToolbarGroup> */}

      {/* <ToolbarSeparator /> */}

      {/* <ToolbarGroup><ImageUploadButton text="Add" /></ToolbarGroup> */}

      {/* <Spacer /> */}

      {/* {isMobile && <ToolbarSeparator />} */}

      {/* <ToolbarGroup><ThemeToggle /></ToolbarGroup> */}
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

interface EditorProps {
  editor: TipTapEditor;
}

export const Editor: FC<EditorProps> = ({ editor }) => {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');
  const toolbarRef = useRef<HTMLDivElement>(null);

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') setMobileView('main');
  }, [isMobile, mobileView]);

  return (
    <div className="relative rounded-default border border-border">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={isMobile ? { bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)` } : {}}
        >
          {mobileView === 'main' ? (
            <MainToolbarContent
              isMobile={isMobile}
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
            />
          ) : (
            <MobileToolbarContent
              onBack={() => setMobileView('main')}
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
            />
          )}
        </Toolbar>
        <div className="bg-input-bg p-sm content-wrapper [&_contenteditable]:focus-visible:outline-none">
          <EditorContent editor={editor} />
        </div>
      </EditorContext.Provider>
    </div>
  );
};
