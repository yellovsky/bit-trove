import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { ErrorScreen } from '@shared/ui/error-route';
import { Logo } from '@shared/ui/Logo';

import { Navbar } from '@widgets/Navbar';
import { LanguageSwitcherDesktop } from '@widgets/page-header/ui/LanguageSwitcher';

import { ColorSchemeSwitcher } from '@features/theme';

import styles from './Layout.module.css';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
        width: { base: 200, md: 300 },
      }}
      padding="md"
    >
      <AppShell.Header className={styles.header}>
        <Group h="100%" justify="space-between" px="md" py="sm">
          <Group h="100%">
            <Burger hiddenFrom="sm" onClick={toggle} opened={opened} size="sm" />
            <Logo className={styles.logo} />
          </Group>

          <Group>
            <LanguageSwitcherDesktop />
            <ColorSchemeSwitcher />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className={styles.navbar}>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default function HomeLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const ErrorBoundary = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ErrorScreen
        buttonText={t('error_page.500.button_text')}
        code={500}
        onButtonClick={() => window.location.reload()}
        subtitle={t('error_page.500.subtitle')}
        title={t('error_page.500.title')}
      />
    </Layout>
  );
};
