// global modules
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';

import {
  type ComponentProps,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

// common modules
import { getTutorialsRouteLink } from '~/utils/links';
import { NavLink } from '~/components/link';
import { Icon, type IconType } from '~/components/icon';
import { useAuthStatus, useLogout } from '~/utils/auth';

// local modules
import {
  active as activeCn,
  drawer as drawerCn,
  drawerHolder as drawerHolderCn,
  link as linkCn,
  overlay as overlayCn,
} from './drawer.module.scss';

interface DrawerItemProps extends ComponentProps<typeof NavLink> {
  icon?: IconType;
  text: ReactNode;
}

const DrawerItem: FC<DrawerItemProps> = ({ text, icon, ...rest }) => (
  <NavLink end {...rest}>
    {nProps => (
      <div className={clsx(rest.className, linkCn, nProps.isActive && activeCn)}>
        <div>{!icon ? null : <Icon type={icon} />}</div>
        <div>{text}</div>
      </div>
    )}
  </NavLink>
);

const Overlay = animated<FC<HTMLAttributes<HTMLDivElement>>>(props => (
  <div {...props} className={clsx(props.className, overlayCn)} />
));

interface DrawerProps {
  show: boolean;
  toggle(): void;
}

const DURATION = 150;

export const Drawer: FC<DrawerProps> = ({ show, toggle }) => {
  const { t } = useTranslation();
  const authStatus = useAuthStatus();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const logout = useLogout();
  const drawerStyles = useSpring({
    config: { duration: DURATION },
    drawerLeft: show ? 0 : -18,
  });

  const overlayStyles = useSpring({
    config: { duration: DURATION },
    onRest: () => {
      if (!show) setIsDisplayed(false);
    },
    onStart: () => {
      if (show) setIsDisplayed(true);
    },
    opacity: show ? 0.4 : 0,
  });

  useEffect(() => {
    if (!show) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, toggle]);

  const handleLogoutClick = useCallback(() => {
    logout();
    toggle();
  }, [logout, toggle]);

  return (
    <>
      <animated.div
        className={drawerHolderCn}
        style={{
          // @ts-expect-error
          '--drawer-left': drawerStyles.drawerLeft.to(size => `${size}rem`),
        }}
      >
        <div className={drawerCn}>
          <DrawerItem
            icon="home"
            onClick={toggle}
            text={t('HOME_PAGE_TITLE')}
            to="/"
            variant="plain"
          />

          <DrawerItem
            icon="article"
            onClick={toggle}
            text={t('BLOG_PAGE_TITLE')}
            to="/blog"
            variant="plain"
          />

          <DrawerItem
            icon="scroll"
            onClick={toggle}
            text={t('TUTORIALS_PAGE_TITLE')}
            to={getTutorialsRouteLink()}
            variant="plain"
          />

          <DrawerItem
            icon="info"
            onClick={toggle}
            text={t('ABOUT_PAGE_TITLE')}
            to="/about"
            variant="plain"
          />

          {authStatus !== 'authorized' ? null : (
            <>
              <DrawerItem onClick={toggle} text="CMS" to="/cms" variant="plain" />
              <DrawerItem onClick={handleLogoutClick} text="Logout" to="#" variant="plain" />
            </>
          )}
        </div>
      </animated.div>
      {!isDisplayed ? null : <Overlay onClick={toggle} style={{ ...overlayStyles }} />}
    </>
  );
};
