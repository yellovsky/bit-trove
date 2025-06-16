import { AppShell, Burger, Divider, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useRouteError } from 'react-router';

import { ErrorScreen } from '@shared/ui/error-route';
import { Logo } from '@shared/ui/Logo';

import { Navbar } from '@widgets/Navbar';
import { LanguageSwitcherDesktop } from '@widgets/page-header/ui/LanguageSwitcher';

import { ColorSchemeSwitcher } from '@features/theme';

import styles from './Layout.module.css';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
        width: { base: 200, md: 300 },
      }}
      padding={{ base: 'md', md: 'lg' }}
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

      <AppShell.Main>
        <div className={styles.contentHolder}>
          <div className={styles.content}>{children}</div>
          <div>
            <Divider my="md" />
            <Text c="dimmed" size="xs" ta="center">
              {t('{{year}} all rights reserved', { year: new Date().getFullYear() })}
            </Text>
          </div>
        </div>
      </AppShell.Main>
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
  const error = useRouteError();

  const notFound = error && typeof error === 'object' && 'status' in error && error.status === 404;

  return (
    <Layout>
      {notFound ? (
        <ErrorScreen
          buttonText={t('error_page.404.button_text')}
          code={404}
          onButtonClick={() => window.location.reload()}
          subtitle={t('error_page.404.subtitle')}
          title={t('error_page.404.title')}
        />
      ) : (
        <ErrorScreen
          buttonText={t('error_page.500.button_text')}
          code={500}
          onButtonClick={() => window.location.reload()}
          subtitle={t('error_page.500.subtitle')}
          title={t('error_page.500.title')}
        />
      )}
    </Layout>
  );
};
