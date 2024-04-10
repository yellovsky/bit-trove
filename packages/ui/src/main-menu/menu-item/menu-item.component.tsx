// global modules
import { Link } from '@bit-trove/ui/link';
import type { ComponentProps, FC, MouseEventHandler, ReactNode } from 'react';

// local modules
import { icon as iconCn, menuItem as menuItemCn } from './menu-item.module.scss';

interface BaseMenuItemProps {
  name: ReactNode;
  icon?: string;
}

interface LinkMenuItemProps extends BaseMenuItemProps {
  to: ComponentProps<typeof Link>['to'];
}

interface ButtonMenuItemProps extends BaseMenuItemProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps;

export const MenuItem: FC<MenuItemProps> = ({ name, icon, ...rest }) => {
  return 'to' in rest ? (
    <Link className={menuItemCn} to={rest.to}>
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
