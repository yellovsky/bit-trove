import { Button } from '@mantine/core';
import type { ComponentProps, FC, ReactNode } from 'react';
import { type PathPattern, useMatch } from 'react-router';

import { Link } from '@shared/ui/link';

import styles from './NavItem.module.css';

interface NavItemProps extends Pick<ComponentProps<typeof Link>, 'to' | 'children'> {
  icon?: ReactNode;
  end?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ end, icon, ...rest }) => {
  const pathname = typeof rest.to === 'string' ? rest.to : rest.to.pathname;
  const pathPattern: PathPattern<string> =
    pathname === '/' ? { end: true, path: '/:locale' } : { path: [`/:locale${pathname}`, end ? '' : '/*'].join('') };
  const active = !!useMatch(pathPattern);

  return (
    <Button
      {...rest}
      c="bg"
      className={styles.link}
      component={Link}
      fullWidth
      justify="start"
      leftSection={icon}
      mb="xs"
      radius="sm"
      size="md"
      variant={active ? 'filled' : 'subtle'}
    />
  );
};

interface NavItemButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
}

export const NavItemButton: FC<NavItemButtonProps> = (props) => {
  return (
    <Button
      {...props}
      c="bg"
      className={styles.link}
      fullWidth
      justify="start"
      leftSection={props.icon}
      radius="sm"
      size="md"
      variant="subtle"
    />
  );
};
