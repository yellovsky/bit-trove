// global modules
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { type MenuItemProps, MenuItem } from './menu-item';

// local modules
import {
  logo as logoCn,
  left as leftCn,
  right as rightCn,
  holder as holderCn,
  wrapper as wrapperCn,
  itemsColumn as itemsColumnCn,
} from './main-menu.module.scss';

interface MainMenuProps {
  navigation: MenuItemProps[];
  buttons: MenuItemProps[];
}

export const MainMenu: FC<MainMenuProps> = (props) => {
  return (
    <div className={wrapperCn}>
      <nav className={holderCn}>
        <div className={cn(itemsColumnCn, leftCn)}>
          {props.navigation.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
        <div>
          <Link className={logoCn} href="/">
            <Image alt="logo" height={75} src="/assets/logo.svg" width={97} />
          </Link>
        </div>
        <div className={cn(itemsColumnCn, rightCn)}>
          {props.buttons.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </nav>
    </div>
  );
};
