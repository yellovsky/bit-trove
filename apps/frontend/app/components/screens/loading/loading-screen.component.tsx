// global modules
import type { FC } from 'react';

// common modules
import { Spinner } from '~/components/spinner';

// local modules
import { ScreenLayout } from '../screen-layout';
import { spinner as spinnerCn } from './loading-screen.module.scss';

export const LoadingScreen: FC = () => (
  <ScreenLayout code={<Spinner className={spinnerCn} />} message="Loading..." />
);
