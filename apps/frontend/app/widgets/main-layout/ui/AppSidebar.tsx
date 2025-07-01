import { useAtomValue } from 'jotai';
import { HomeIcon, LogOutIcon, NewspaperIcon, PuzzleIcon } from 'lucide-react';
import type * as React from 'react';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@repo/ui/components/Link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@repo/ui/components/Sidebar';

import { Logo } from '@shared/ui/Logo';

import { useIsAuthorized } from '@features/auth';
import { signOutMutationAtom } from '@features/auth/model/sign-out-atom';

import { type NavigationItem, NavSection } from './NavSection';

const useNavItems = (): NavigationItem[] => {
  const { t } = useTranslation();

  return [
    { end: true, icon: HomeIcon, title: t('menu_items.home.title'), to: '/' },
    { icon: NewspaperIcon, title: t('menu_items.blog.title'), to: '/blog' },
    { icon: PuzzleIcon, title: t('menu_items.shards.title'), to: '/shards' },
  ];
};

const useNavItemsCms = (): NavigationItem[] => {
  const { t } = useTranslation();

  return [
    { end: true, title: t('menu_items.cms.title'), to: '/cms' },
    { title: t('menu_items.shards.title'), to: '/cms/shards' },
  ];
};

export const AppSidebar: React.FC<ComponentProps<typeof Sidebar>> = ({ ...props }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');
  const isAuthorized = useIsAuthorized();
  const navItems = useNavItems();
  const signOutMutation = useAtomValue(signOutMutationAtom);
  const navItemsCms = useNavItemsCms();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="-mt-px border-b border-b-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" variant="unstyled">
                <Logo className="size-4" short />
                <span className="text-primary-11">Bit Trove</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavSection items={navItems} label="Navigation" />
        <NavSection items={navItemsCms} label="CMS" />
      </SidebarContent>

      <SidebarFooter>
        {isAuthorized && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer" onClick={() => signOutMutation.mutate()} size="lg">
                <LogOutIcon />
                <span>{tAuth('sign_out_menu_item.text')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <div className="border-t border-t-border pt-2 text-center text-gray-a11 text-xs opacity-50">
          {t('{{year}} all rights reserved', { year: new Date().getFullYear() })}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
