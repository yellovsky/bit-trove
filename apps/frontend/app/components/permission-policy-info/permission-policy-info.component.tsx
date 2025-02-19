// global modules
import type { FC } from 'react';
import type { PermissionPolicy } from '@repo/api-models';
import { useTranslation } from 'react-i18next';

// local modules
import { PermissionPolicyInfoPending } from './permission-policy-info.pending';

import {
  label as labelCn,
  note as noteCn,
  policyInfo as policyInfoCn,
  value as valueCn,
} from './permission-policy-info.module.scss';

interface PermissionPolicyInfoProps {
  pending?: string;
  className?: string;
  policy: PermissionPolicy | undefined;
}

export const PermissionPolicyInfo: FC<PermissionPolicyInfoProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  return !props.policy || props.pending ? (
    <PermissionPolicyInfoPending className={props.className} />
  ) : (
    <div className={props.className}>
      <div className={policyInfoCn}>
        <div className={labelCn}>{cmsT('ID')}:</div>
        <div className={valueCn}>{props.policy.id}</div>
        <div className={labelCn}>{cmsT('Subject')}:</div>
        <div className={valueCn}>{props.policy.sub}</div>
        <div className={labelCn}>{cmsT('Action')}:</div>
        <div className={valueCn}>{props.policy.act}</div>
        <div className={labelCn}>{cmsT('Obj. Type')}:</div>
        <div className={valueCn}>{props.policy.obj_type}</div>
        <div className={labelCn}>{cmsT('Condition')}:</div>
        <div className={valueCn}>{props.policy.cond}</div>
      </div>

      <div className={noteCn}>{props.policy.note}</div>
    </div>
  );
};
