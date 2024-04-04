// global modules
import 'server-only';
import type { FC } from 'react';
import { notFound } from 'next/navigation';

const NotFoundPage: FC = () => notFound();

export default NotFoundPage;
