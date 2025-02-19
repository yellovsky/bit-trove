// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import {
  label as labelCn,
  pending as pendingCn,
  policyInfo as policyInfoCn,
  value as valueCn,
} from './permission-policy-info.module.scss';

export const PermissionPolicyInfoPending: FC<{ className?: string }> = props => (
  <div className={props.className}>
    <div className={policyInfoCn}>
      <div className={clsx(labelCn, pendingCn)} />
      <div className={clsx(valueCn, pendingCn)} />
      <div className={clsx(labelCn, pendingCn)} />
      <div className={clsx(valueCn, pendingCn)} />
      <div className={clsx(labelCn, pendingCn)} />
      <div className={clsx(valueCn, pendingCn)} />
      <div className={clsx(labelCn, pendingCn)} />
      <div className={clsx(valueCn, pendingCn)} />
      <div className={clsx(labelCn, pendingCn)} />
      <div className={clsx(valueCn, pendingCn)} />
    </div>
  </div>
);
