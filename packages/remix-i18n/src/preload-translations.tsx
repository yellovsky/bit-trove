// global modules
import { useMatches } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export interface PreloadTranslationsProps {
  loadPath: string;
}

export function PreloadTranslations({ loadPath }: PreloadTranslationsProps) {
  const { i18n } = useTranslation();

  const namespaces = [
    ...new Set(
      useMatches()
        .filter((route) => (route.handle as { i18n?: string | string[] })?.i18n !== undefined)
        .flatMap((route) => (route.handle as { i18n: string | string[] }).i18n)
    ),
  ];

  return (
    <>
      {namespaces.map((namespace) => {
        return (
          <link
            as="fetch"
            href={loadPath.replace('{{lng}}', i18n.language).replace('{{ns}}', namespace)}
            key={namespace}
            rel="preload"
          />
        );
      })}
    </>
  );
}
