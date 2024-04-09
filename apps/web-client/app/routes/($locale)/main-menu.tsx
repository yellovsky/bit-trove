import type { TFunction } from 'i18next';
import { useMemo, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MainMenu as MainMenuUi } from '@bit-trove/ui/main-menu';

const getMainMenuProps = (t: TFunction) => {
  return {
    navigation: [
      { href: '/', name: t('home_page') },
      { href: '/blog', name: t('blogs_page') },
      { href: '/thoughts', name: t('thoughts_page') },
      { href: '/', name: t('tips_and_tricks_page') },
    ],

    buttons: [
      { icon: '/assets/search.svg', name: t('search_button'), onClick: () => {} },
      { icon: '/assets/burger.svg', name: t('menu'), onClick: () => {} },
    ],
  };
};

export const MainMenu: FC = () => {
  const { t, i18n } = useTranslation();

  const mainMenuProps = useMemo(() => getMainMenuProps(t), [t]);
  console.log('mainMenuProps', i18n.language, mainMenuProps);
  //   return <div>{JSON.stringify(mainMenuProps)}</div>;
  console.log('MainMenuUi', MainMenuUi);
  return <MainMenuUi {...mainMenuProps} />;
};
