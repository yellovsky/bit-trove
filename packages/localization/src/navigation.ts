// global modules
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

// local modules
import { localePrefix, locales, pathnames } from './config';

type Navigation = ReturnType<
  typeof createLocalizedPathnamesNavigation<typeof locales, typeof pathnames>
>;

const navigation = createLocalizedPathnamesNavigation<typeof locales, typeof pathnames>({
  localePrefix,
  locales,
  pathnames,
});

export const redirect: Navigation['redirect'] = navigation.redirect;
export const usePathname: Navigation['usePathname'] = navigation.usePathname;
export const useRouter: Navigation['useRouter'] = navigation.useRouter;
