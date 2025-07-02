import type { FC, PropsWithChildren } from 'react';

import { ScrollArea } from '@repo/ui/components/ScrollArea';
import { Separator } from '@repo/ui/components/Separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@repo/ui/components/Sidebar';
import { TextInput } from '@repo/ui/components/TextInput';

import { LanguageSwitcher } from '@features/language-switcher';
import { ColorSchemeSwitcher } from '@features/theme';

import { AppSidebar } from './AppSidebar';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-b-border transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
          <div className="flex-1">
            <TextInput placeholder="Search" />
          </div>
          <LanguageSwitcher />
          <ColorSchemeSwitcher />
        </div>
      </header>
      <ScrollArea className="h-[calc(100dvh-3rem)]">
        <div className="max-w-dvw px-4 py-6">
          {children}
        </div>
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
);
