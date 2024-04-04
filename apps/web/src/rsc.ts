// global modules
import type { ReactNode } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { SupportedLocale } from '@bit-trove/localization/config';

export interface RSCWithParamsProps<TParams extends Record<string, string | string[] | undefined>> {
  params: TParams;
}

export interface RSCLayoutProps<
  TParams extends Record<string, string | string[] | undefined> = { locale: SupportedLocale },
> extends RSCWithParamsProps<TParams & { locale: SupportedLocale }> {
  children: ReactNode;
}

export interface RSCPageProps<
  TParams extends Record<string, string | string[] | undefined> = { locale: SupportedLocale },
> extends RSCWithParamsProps<TParams & { locale: SupportedLocale }> {
  searchParams: ReadonlyURLSearchParams;
}
