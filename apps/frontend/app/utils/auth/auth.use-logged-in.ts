// common modules
import { useIsAuthorizedQuery } from '~/api/auth';

export const useLoggedIn = (): boolean => !!useIsAuthorizedQuery().data?.data.isAuthorized;
