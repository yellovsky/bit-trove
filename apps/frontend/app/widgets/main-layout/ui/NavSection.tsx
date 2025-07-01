import type { LucideIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { type PathPattern, type To, useMatch } from 'react-router';

import { Link } from '@repo/ui/components/Link';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/Sidebar';

export interface NavigationItem {
  title: string;
  to: To;
  icon?: LucideIcon;
  end?: boolean;
}

const NavSectionItem: FC<{ item: NavigationItem }> = ({ item }) => {
  const pathname = typeof item.to === 'string' ? item.to : item.to.pathname;
  const pathPattern: PathPattern<string> =
    pathname === '/'
      ? { end: true, path: '/:locale' }
      : { path: [`/:locale${pathname}`, item.end ? '' : '/*'].join('') };

  const isActive = !!useMatch(pathPattern);

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link to={item.to} variant="unstyled">
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

interface NavSectionProps {
  label?: ReactNode;
  items: NavigationItem[];
}

export const NavSection: FC<NavSectionProps> = ({ label, items }) => (
  <SidebarGroup>
    {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavSectionItem item={item} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
