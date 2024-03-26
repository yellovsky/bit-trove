// global modules
import type { PropsWithChildren } from 'react';

// local modules
import './globals.scss';

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return <>{children}</>;
}
