// global modules
import clsx from 'clsx';
import { type ComponentProps, type FC, type ReactNode, useEffect } from 'react';

// common modules
import { NavLink } from '~/components/link';
import { Icon, type IconType } from '~/components/icon';

// local modules
import {
  active as activeCn,
  drawer as drawerCn,
  drawerHolder as drawerHolderCn,
  link as linkCn,
  open as openCn,
  overlay as overlayCn,
} from './drawer.module.scss';

interface DrawerItemProps extends ComponentProps<typeof NavLink> {
  icon: IconType;
  text: ReactNode;
}

const DrawerItem: FC<DrawerItemProps> = ({ text, icon, ...rest }) => (
  <NavLink end {...rest}>
    {nProps => (
      <div className={clsx(rest.className, linkCn, nProps.isActive && activeCn)}>
        <div>
          <Icon type={icon} />
        </div>
        <div>{text}</div>
      </div>
    )}
  </NavLink>
);

interface DrawerProps {
  show: boolean;
  toggle(): void;
}

export const Drawer: FC<DrawerProps> = ({ show, toggle }) => {
  useEffect(() => {
    if (!show) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, toggle]);

  return (
    <>
      <div className={clsx(drawerHolderCn, show && openCn)}>
        <div className={drawerCn}>
          <DrawerItem icon="home" onClick={toggle} text="Home" to="/" variant="plain" />
          <DrawerItem icon="article" onClick={toggle} text="Blog" to="/blog" variant="plain" />
          <DrawerItem icon="info" onClick={toggle} text="About" to="/about" variant="plain" />
        </div>
      </div>
      <div className={clsx(overlayCn, show && openCn)} onClick={toggle} />
    </>
  );
};
