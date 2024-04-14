// global modules
import * as R from 'ramda';
import cn from 'classnames';
import { Link } from '@bit-trove/ui/link';
import { Skeleton } from '@bit-trove/ui/skeleton';
import type { To } from 'history';
import { applyBorderRadius, type BorderRadiusProps } from '@bit-trove/ui/apply-border-radius';
import { applyColorScheme, type ColorSchemeProps } from '@bit-trove/ui/apply-color-scheme';
import type { FC, PropsWithChildren } from 'react';

// local modules
import {
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

export type TagVariant = 'filled' | 'outline';

export interface TagProps extends PropsWithChildren, ColorSchemeProps, BorderRadiusProps {
  size?: TagSize;
  className?: string;
  variant: TagVariant;
  to?: To;
}

const applyTagCn = R.compose(
  applyColorScheme<TagProps>(),
  applyBorderRadius<TagProps>({ br: 'md' })
);

export const Tag: FC<TagProps> = (props) => {
  const { className, variant, to, size = 'md', ...rest } = applyTagCn(props);

  const cName = cn(
    className,
    tagCn,
    size === 'sm' && smCn,
    size === 'md' && mdCn,
    size === 'lg' && lgCn,
    variant === 'filled' && filledCn,
    variant === 'outline' && outlineCn,
    to && linkCn
  );

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

type TagPendingProps = Pick<TagProps, 'size' | 'className' | 'borderRadius'>;

export const TagPending: FC<TagPendingProps> = (props) => {
  const { className, size = 'md' } = applyBorderRadius<TagPendingProps>({ br: 'md' })(props);

  const cName = cn(
    className,
    tagCn,
    pendingCn,
    size === 'sm' && smCn,
    size === 'md' && mdCn,
    size === 'lg' && lgCn
  );

  return <Skeleton className={cName} />;
};
