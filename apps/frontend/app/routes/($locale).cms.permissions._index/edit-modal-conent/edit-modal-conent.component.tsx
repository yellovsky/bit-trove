// global modules
import type { UpsertPermissionPolicyFP } from '@repo/api-models';
import { type FC, useCallback, useMemo } from 'react';

// common modules
import { PermissionPolicyForm } from '~/components/forms/permission-policy';

import {
  useCMSPermissionPolicyQuery,
  useUpdatePermissionPolicyMutation,
} from '~/api/permission-policy';

interface EditModalConentProps {
  id: string;
  onSuccess(): void;
}

export const EditModalConent: FC<EditModalConentProps> = props => {
  const query = useCMSPermissionPolicyQuery(props.id);
  const mutation = useUpdatePermissionPolicyMutation({ onSuccess: props.onSuccess });

  const defaultValues = useMemo(
    (): UpsertPermissionPolicyFP => ({
      act: query.data?.data.act || null,
      cond: query.data?.data.cond || null,
      note: query.data?.data.note || null,
      obj_type: query.data?.data.obj_type || null,
      sub: query.data?.data.sub || null,
    }),
    [query.data?.data],
  );

  const handleSubmit = useCallback(
    (values: UpsertPermissionPolicyFP) => {
      mutation.mutate({ ...values, id: props.id });
    },
    [props.id],
  );

  return (
    <PermissionPolicyForm
      defaultValues={defaultValues}
      key={String(query.isFetched)}
      onSubmit={handleSubmit}
    />
  );
};
