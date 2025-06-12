import { Divider, Text } from '@mantine/core';
import { IconArticle, IconBulb, IconHome, IconLogout } from '@tabler/icons-react';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsAuthorized } from '@features/auth';
import { signOutMutationAtom } from '@features/auth/model/sign-out-atom';

// import { MantineLogo } from '@mantinex/mantine-logo';
import styles from './Navbar.module.css';
import { NavItem, NavItemButton } from './NavItem';

const useNavItems = () => {
  const { t } = useTranslation();

  return [
    { end: true, icon: IconHome, label: t('menu_items.home.title'), link: '/' },
    { icon: IconArticle, label: t('menu_items.blog.title'), link: '/blog' },
    { icon: IconBulb, label: t('menu_items.thoughts.title'), link: '/thoughts' },
  ];
};

const useCMSNavItems = () => {
  const { t } = useTranslation();

  return [
    { end: true, label: t('menu_items.cms.title'), link: '/cms' },
    { label: t('menu_items.thoughts.title'), link: '/cms/thoughts' },
  ];
};

export const Navbar: FC = () => {
  const links = useNavItems();
  const cmsLinks = useCMSNavItems();
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const signOutMutation = useAtomValue(signOutMutationAtom);
  const { isAuthorized } = useIsAuthorized();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>
        {links.map((item) => (
          <NavItem end={item.end} icon={<item.icon stroke={1.5} />} key={item.label} to={item.link}>
            {item.label}
          </NavItem>
        ))}

        {isAuthorized && (
          <>
            <Text c="dimmed" fw={500} mb="xs" size="xs">
              {t('Content management')}
            </Text>
            <Divider />

            {cmsLinks.map((item) => (
              <NavItem end={item.end} key={item.label} to={item.link}>
                {item.label}
              </NavItem>
            ))}
          </>
        )}
      </div>

      {isAuthorized && (
        <div className={styles.footer}>
          <NavItemButton icon={<IconLogout stroke={1.5} />} onClick={() => signOutMutation.mutate()}>
            {tAuth('sign_out_menu_item.text')}
          </NavItemButton>
        </div>
      )}
    </nav>
  );
};
