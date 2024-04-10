// global modules
import { MainMenu as MainMenuUi } from '@bit-trove/ui/main-menu';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { type FC, useMemo } from 'react';

const getMainMenuProps = (t: TFunction) => {
  return {
    navigation: [
      { name: t('home_page'), to: '/' },
      { name: t('blogs_page'), to: '/blog' },
      { name: t('thoughts_page'), to: '/thoughts' },
      { name: t('tips_and_tricks_page'), to: '/' },
    ],

    buttons: [
      { icon: '/assets/search.svg', name: t('search_button'), onClick: () => {} },
      { icon: '/assets/burger.svg', name: t('menu'), onClick: () => {} },
    ],
  };
};

export const MainMenu: FC = () => {
  const { t } = useTranslation();

  const mainMenuProps = useMemo(() => getMainMenuProps(t), [t]);

  return <MainMenuUi {...mainMenuProps} />;
};
