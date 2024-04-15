// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import { Link } from '@repo/ui/link';
import { Skeleton } from '@repo/ui/skeleton';
import type { To } from 'history';
import { applyBorderRadius, type BorderRadiusProps } from '@repo/ui/apply-border-radius';
import { applyColorScheme, type ColorSchemeProps } from '@repo/ui/apply-color-scheme';
import type { FC, PropsWithChildren } from 'react';

// local modules
import {
  borderless as borderlessCn,
  filled as filledCn,
  label as labelCn,
  leftIcon as leftIconCn,
  lg as lgCn,
  link as linkCn,
  md as mdCn,
  outline as outlineCn,
  pending as pendingCn,
  rightIcon as rightIconCn,
  sm as smCn,
  tag as tagCn,
} from './tag.module.scss';

export type TagSize = 'sm' | 'md' | 'lg';

const getSizeCn = (size: TagSize): string =>
  clsx(size === 'sm' && smCn, size === 'md' && mdCn, size === 'lg' && lgCn);

export type TagVariant = 'filled' | 'outline' | 'borderless' | 'plain';

const getVariantCn = (variant: TagVariant): string =>
  clsx(
    variant === 'filled' && filledCn,
    variant === 'outline' && outlineCn,
    variant === 'borderless' && borderlessCn
  );

export interface TagProps extends PropsWithChildren, ColorSchemeProps, BorderRadiusProps {
  size?: TagSize;
  className?: string;
  variant: TagVariant;
  to?: To;
}

const applyTagCn = R.compose(applyColorScheme<TagProps>, applyBorderRadius<TagProps>);

export const Tag: FC<TagProps> = (props) => {
  const {
    className,
    variant,
    to,
    size = 'md',
    ...rest
  } = applyTagCn({ br: 'md' as const, ...props });

  const cName = clsx(className, tagCn, to && linkCn, getSizeCn(size), getVariantCn(variant));

  return to ? (
    <Link {...rest} className={cName} to={to} variant="plain" />
  ) : (
    <span {...rest} className={cName} />
  );
};

export const TagLeftIcon: FC<PropsWithChildren> = (props) => (
  <span {...props} className={leftIconCn} />
);

export const TagRightIcon: FC<PropsWithChildren> = (props) => (
  <span {...props} className={rightIconCn} />
);

export const TagLabel: FC<PropsWithChildren> = (props) => <span {...props} className={labelCn} />;

type TagPendingProps = Pick<TagProps, 'size' | 'className' | keyof BorderRadiusProps>;

export const TagPending: FC<TagPendingProps> = (props) => {
  const { className, size = 'md' } = applyBorderRadius<TagPendingProps>({
    br: 'md' as const,
    ...props,
  });

  const cName = clsx(className, tagCn, pendingCn, getSizeCn(size));

  return <Skeleton className={cName} />;
};
