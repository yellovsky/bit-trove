import { useTranslation } from 'react-i18next';
import { data, type MetaDescriptor, useNavigate } from 'react-router';

import { filterParentMeta } from '@shared/lib/meta';
import { ErrorScreen } from '@shared/ui/ErrorScreen';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';

export async function loader(loaderArgs: Route.LoaderArgs) {
  const t = await appI18next.getFixedT(loaderArgs.params.locale);
  const meta: MetaDescriptor[] = [{ title: t('error_page.404.title') }];
  return data({ meta }, { status: 404 });
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  const parentMeta = filterParentMeta(params.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, ...(params.data?.meta ?? [])];
}

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/${i18n.language}`);
  };

  return (
    <ErrorScreen
      buttonText={t('error_page.404.button_text')}
      code={404}
      onButtonClick={handleButtonClick}
      subtitle={t('error_page.404.subtitle')}
      title={t('error_page.404.title')}
    />
  );
}
