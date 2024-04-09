// import { Link, Outlet, LoaderFunction } from 'remix';
// import { i18n } from '../../lib/i18n.server';
// import { Trans, useTranslation } from 'react-i18next';

import type { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export const loader: LoaderFunction = async ({ params }): Promise<{ lang: string }> => {
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000)
  // );
  return { params };
};

import { hello as helloCn } from './route.module.scss';
import { NoResult } from '@bit-trove/ui/no-result';
import { Button, useColorMode } from '@chakra-ui/react';

export default function UsersIndex() {
  const loaded = useLoaderData() as { lang: string };

  let { t, i18n } = useTranslation();

  const { colorMode, toggleColorMode } = useColorMode();

  console.log('cmp i18n', i18n.language);
  return (
    <div>
      <div>
        <div>colorMode: {colorMode}</div>
        <Button my={4} onClick={toggleColorMode}>
          {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
        </Button>
        <Button colorScheme="primary">butston</Button>
        <Link to="/en">main</Link>
        <br />
        <Link to="/en/thoughts/recursive-typings-tree-structure">one</Link>
        <br />
        <Link to="/en/thoughts/typography-heading-elements">two</Link>
      </div>
      <NoResult />
      sd
      <h1 className={helloCn}>{t('greeting')}</h1>
      apps/web-client/app/routes/$lang.thoughts/route.tsx
      <br />
      loaded: {JSON.stringify(loaded)}
      <Outlet />
    </div>
  );
}
