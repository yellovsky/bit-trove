// global modules
import { ClientOnly } from 'remix-utils/client-only';
import { useCallback } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';
import { useColorMode } from '~/components/color-mode';

// local modules
import { holder as holderCn } from './theme-switch.module.scss';

export const ThemeSwitch = () => {
  const [colorMode, setColorMode] = useColorMode();
  const iconType = colorMode === 'dark' ? 'sun' : 'moon';

  const toggle = useCallback(() => {
    colorMode === 'dark' ? setColorMode('light') : setColorMode('dark');
  }, [colorMode, setColorMode]);

  return (
    <ClientOnly
      fallback={
        <img
          alt="Loading Light/Dark Toggle"
          className={holderCn}
          height={25}
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          title="Loading Light/Dark Toggle"
          width={25}
        />
      }
    >
      {() => (
        <IconButton onClick={toggle} variant="text">
          <Icon type={iconType} />
        </IconButton>
      )}
    </ClientOnly>
  );
};
