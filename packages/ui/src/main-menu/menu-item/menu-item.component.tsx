// global modules
import type { UrlObject } from 'url';
import { Link } from '@bit-trove/localization/link';
import type { FC, MouseEventHandler, ReactNode } from 'react';

// local modules
import { menuItem as menuItemCn, icon as iconCn } from './menu-item.module.scss';

interface BaseMenuItemProps {
  name: ReactNode;
  icon?: string;
}

interface LinkMenuItemProps extends BaseMenuItemProps {
  href: string | UrlObject;
}

interface ButtonMenuItemProps extends BaseMenuItemProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps;

export const MenuItem: FC<MenuItemProps> = ({ name, icon, ...rest }) => {
  return 'href' in rest ? (
    <Link className={menuItemCn} href={rest.href}>
      {icon ? <div className={iconCn} style={{ maskImage: `url("${icon}")` }} /> : null}
      <span>{name}</span>
    </Link>
  ) : (
    <button className={menuItemCn}>
      {icon ? <div className={iconCn} style={{ maskImage: `url("${icon}")` }} /> : null}
      <span>{name}</span>
    </button>
  );
};