// global modules
import 'i18next';

import commonNs from './en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonNs;
    };
  }
}
