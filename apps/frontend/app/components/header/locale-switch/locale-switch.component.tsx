// global modules
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useCallback, useState } from 'react';

// common modules
import { languageNames } from '~/config/i18n';

import {
  en as enCn,
  icon as iconCn,
  items as itemsCn,
  langButton as langButtonCn,
  langItem as langItemCn,
  ru as ruCn,
} from './locale-switch.module.scss';

export interface SelectLocale {
  label: string;
  value: string;
  disabled?: boolean;
}

export const LocaleSwitch = () => {
  const { i18n } = useTranslation();
  const [pending, setPending] = useState(false);

  const changeLocale = useCallback((locale: string) => {
    const [pathnameLocale, ...parts] = window.location.pathname.split('/').filter(Boolean);
    if (pathnameLocale === locale) return;
    setPending(true);
    window.location.pathname = !parts.length ? `/${locale}` : `/${locale}/${parts.join('/')}`;
  }, []);

  const serRuLocale = useCallback(() => changeLocale('ru'), []);
  const serEnLocale = useCallback(() => changeLocale('en'), []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className={langButtonCn} disabled={pending}>
          <div
            className={clsx(iconCn, i18n.language === 'en' && enCn, i18n.language === 'ru' && ruCn)}
          />
        </MenuButton>
      </div>

      <MenuItems transition className={itemsCn}>
        <div className="py-1">
          <MenuItem>
            <div className={langItemCn} onClick={serEnLocale}>
              <div className={clsx(iconCn, enCn)} />
              <div>{languageNames.en}</div>
            </div>
          </MenuItem>

          <MenuItem>
            <div className={langItemCn} onClick={serRuLocale}>
              <div className={clsx(iconCn, ruCn)} />
              <div>{languageNames.ru}</div>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
