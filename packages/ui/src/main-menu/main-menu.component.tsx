// global modules
import cn from 'classnames';
import type { FC } from 'react';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';
import { MenuItem, type MenuItemProps } from './menu-item';

// local modules
import {
  holder as holderCn,
  itemsColumn as itemsColumnCn,
  left as leftCn,
  logo as logoCn,
  right as rightCn,
  wrapper as wrapperCn,
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
