// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import { Image } from '@repo/ui/image';
import { Skeleton } from '@repo/ui/skeleton';
import { applySpacing, type SpacingProps } from '@repo/ui/apply-spacing';

// local modules
import {
  avatar as avatarCn,
  img as imgCn,
  lg as lgCn,
  md as mdCn,
  sm as smCn,
  xl as xlCn,
  xs as xsCn,
  xxl as xxlCn,
  xxs as xxsCn,
} from './avatar.module.scss';

export type AvatarSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const getSizeCn = (size: AvatarSize): string =>
  clsx(
    size === '2xs' && xxsCn,
    size === 'xs' && xsCn,
    size === 'sm' && smCn,
    size === 'md' && mdCn,
    size === 'lg' && lgCn,
    size === 'xl' && xlCn,
    size === '2xl' && xxlCn
  );

export interface AvatarProps extends SpacingProps {
  src?: string;
  size?: AvatarSize;
}

const applyCn = applySpacing<AvatarProps>();

export const Avatar: FC<AvatarProps> = (props) => {
  const { src, size = 'md', className } = applyCn(props);

  return (
    <div className={clsx(avatarCn, className, getSizeCn(size))}>
      {!src ? null : <Image className={imgCn} src={src} />}
    </div>
  );
};

interface AvatarPendingProps extends SpacingProps {
  size?: AvatarSize;
}

export const AvatarPending: FC<AvatarPendingProps> = (props) => {
  const { size = 'md', className } = applyCn(props);
  return <Skeleton className={clsx(avatarCn, className, getSizeCn(size))} />;
};
