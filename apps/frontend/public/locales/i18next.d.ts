// global modules
import 'i18next';

import type blogCMSNs from './en/blog-cms.json';
import type commonNs from './en/common.json';
import type zodNs from './en/zod.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonNs;
      zod: typeof zodNs;
      'blog-cms': typeof blogCMSNs;
    };
  }
}
