// global modules
import type { UpsertPermissionPolicyFP } from '@repo/api-models';
import { type FC, useCallback, useMemo } from 'react';

// common modules
import { PermissionPolicyForm } from '~/components/forms/permission-policy';
import { useCreatePermissionPolicyMutation } from '~/api/permission-policy';

interface CreateModalConentProps {
  onSuccess(): void;
}

export const CreateModalConent: FC<CreateModalConentProps> = ({ onSuccess }) => {
  const mutation = useCreatePermissionPolicyMutation({ onSuccess });

  const defaultValues = useMemo(
    (): UpsertPermissionPolicyFP => ({
      act: null,
      cond: null,
      note: null,
      obj_type: null,
      sub: null,
    }),
    [],
  );

  const handleSubmit = useCallback((values: UpsertPermissionPolicyFP) => {
    mutation.mutate(values);
  }, []);

  return <PermissionPolicyForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
