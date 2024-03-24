// global modules
import type { PropsWithChildren } from 'react';
import { notFound, type ReadonlyURLSearchParams } from 'next/navigation';
import { isSupportedLocale, type SupportedLocale } from '@bit-trove/localization/config';

export interface RSCLayoutProps<TParam extends string> extends PropsWithChildren {
  params: Record<TParam, string | string[] | undefined>;
}

export interface RSCPageProps<TParam extends string> extends RSCLayoutProps<TParam> {
  searchParams: ReadonlyURLSearchParams;
}

export const getRSCStringParam = <TParam extends string>(
  props: RSCLayoutProps<TParam>,
  param: TParam
): string | undefined => {
  const rawValue = props.params[param];
  return typeof rawValue === 'string' ? rawValue : undefined;
};

export const getRSCLocaleParam = (props: RSCLayoutProps<'locale'>): SupportedLocale => {
  const rawValue = getRSCStringParam(props, 'locale');
  return rawValue && isSupportedLocale(rawValue) ? rawValue : notFound();
};
