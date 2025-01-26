// global modules
import clsx from 'clsx';
import { type FC, useCallback, useState } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';
import { Link } from '~/components/link';
import { Logo } from '~/components/logo';

// local modules
import { Drawer } from './drawer';
import { header as hraderCn } from './header.module.scss';
import { LocaleSwitch } from './locale-switch';
import { ThemeSwitch } from './theme-switch';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const [show, updateShow] = useState(false);
  const toggleShow = useCallback(() => updateShow(prev => !prev), []);

  return (
    <>
      <div className={clsx(className, hraderCn)}>
        <div>
          <IconButton onClick={toggleShow} size="lg" variant="text">
            <Icon type="burger" />
          </IconButton>
        </div>
        <div>
          <Link to="/" variant="plain">
            <Logo />
          </Link>
        </div>
        <div />
        <div>
          <LocaleSwitch />
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </div>
      <Drawer show={show} toggle={toggleShow} />
    </>
  );
};
