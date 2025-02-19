// global modules
import { useTranslation } from 'react-i18next';
import { type FC, useCallback } from 'react';

// common modules
import { Button } from '~/components/button';
import { PermissionPolicyInfo } from '~/components/permission-policy-info';

import {
  useCMSPermissionPolicyQuery,
  useDeletePermissionPolicyMutation,
} from '~/api/permission-policy';

// local modules
import { buttons as buttonsCn } from './delete-confirmation.module.scss';

interface PermissionPolicyDeleteConfirmationProps {
  id: string;

  onCancel(): void;
  onSuccess(): void;
}

export const PermissionPolicyDeleteConfirmation: FC<
  PermissionPolicyDeleteConfirmationProps
> = props => {
  const { t: cmsT } = useTranslation('cms');
  const query = useCMSPermissionPolicyQuery(props.id);
  const policy = query.data?.data;
  const deleteMutation = useDeletePermissionPolicyMutation({ onSuccess: () => props.onSuccess() });

  const handleDeleteClick = useCallback(() => {
    deleteMutation.mutate(props.id);
  }, [props.id]);

  return !policy ? null : (
    <div>
      <PermissionPolicyInfo policy={query.data?.data} />

      <div className={buttonsCn}>
        <Button disabled={deleteMutation.isPending} onClick={props.onCancel} variant="outline">
          {cmsT('Cancel')}
        </Button>
        <Button disabled={deleteMutation.isPending} onClick={handleDeleteClick} variant="filled">
          {cmsT('Delete')}
        </Button>
      </div>
    </div>
  );
};
