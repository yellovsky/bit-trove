import { type FC, type PropsWithChildren, useDeferredValue, useState } from 'react';

import { ScrollArea } from '@repo/ui/components/ScrollArea';
import { Separator } from '@repo/ui/components/Separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@repo/ui/components/Sidebar';

import { MainContentScrollContext } from '@shared/ui/MainContentScroll';

import { LanguageSwitcher } from '@features/language-switcher';
import { ColorSchemeSwitcher } from '@features/theme';

import { AppSidebar } from './AppSidebar';
import { HeaderSearchInput } from './HeaderSearchInput';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [mainScroll, setMainScroll] = useState(0);
  const deferredMainScroll = useDeferredValue(mainScroll);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const docHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
    setMainScroll(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  };

  return (
    <MainContentScrollContext value={deferredMainScroll}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-b-border bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center gap-2 px-8">
              <SidebarTrigger className="-ml-1" />
              <Separator className="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
              <div className="flex-1" />
              <HeaderSearchInput />
              <LanguageSwitcher />
              <ColorSchemeSwitcher />
            </div>
          </header>
          <ScrollArea className="h-[calc(100dvh-3rem)]" onScroll={handleScroll}>
            <div className="max-w-dvw px-8 py-6">{children}</div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </MainContentScrollContext>
  );
};
