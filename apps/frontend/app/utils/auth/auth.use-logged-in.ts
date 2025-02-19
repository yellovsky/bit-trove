// global modules
import { useDeferredValue } from 'react';

// common modules
import { useIsAuthorizedQuery } from '~/api/auth';

export const useAuthStatus = (): 'authorized' | 'not_authorized' | 'pending' => {
  const query = useIsAuthorizedQuery();

  return useDeferredValue(
    !query.isFetched ? 'pending' : query.data?.data.isAuthorized ? 'authorized' : 'not_authorized',
  );
};
