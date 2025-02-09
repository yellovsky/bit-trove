// global modules
import { useCallback } from 'react';

// common modules
import { useLogoutMutation } from '../../api/auth';

const LOGOUT_MUTATION_PARAMS = {} as const;

export const useLogout = () => {
  const logoutMutation = useLogoutMutation(LOGOUT_MUTATION_PARAMS);
  return useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);
};
