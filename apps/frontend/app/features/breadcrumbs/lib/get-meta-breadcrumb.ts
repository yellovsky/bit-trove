import type { BreadcrumbList, WithContext } from 'schema-dts';

import { addClientHost, setPathnameLocale, toToHref } from '@shared/lib/link';

import type { AppBreadcrumb } from '../model/breadcrumb.model';

export const getMetaBreadcrumbs = (items: AppBreadcrumb[], locale: string) => ({
  'script:ld+json': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: {
        '@id': addClientHost(setPathnameLocale(toToHref(item.to), locale)),
        name: item.label,
      },
      position: index + 1,
    })),
  } satisfies WithContext<BreadcrumbList>,
});
