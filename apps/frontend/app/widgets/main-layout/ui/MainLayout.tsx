import type { FC, PropsWithChildren } from 'react';

import { SidebarInset, SidebarProvider } from '@repo/ui/components/Sidebar';

import { AppSidebar } from './AppSidebar';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>{children}</SidebarInset>
  </SidebarProvider>
);
