// global modules
import { type FC, useCallback, useState } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';
import { Logo } from '~/components/logo';

// local modules
import { Drawer } from './drawer';
import { header as hraderCn } from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = () => {
  const [show, updateShow] = useState(false);
  const toggleShow = useCallback(() => updateShow(prev => !prev), []);

  return (
    <>
      <div className={hraderCn}>
        <div>
          <IconButton onClick={toggleShow} size="lg" variant="text">
            <Icon type="burger" />
          </IconButton>
        </div>
        <div>
          <Logo />
        </div>
      </div>
      <Drawer show={show} toggle={toggleShow} />
    </>
  );
};
