// global modules
import 'i18next';

import cmsNs from './en/cms.json';
import cmsRecipesNs from './en/cms-recipes.json';
import commonNs from './en/common.json';
import myNs from './en/my.json';
import recipesNs from './en/recipes.json';
import zodNs from './en/zod.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonNs;
      'cms-recipes': typeof cmsRecipesNs;
      recipes: typeof recipesNs;
      cms: typeof cmsNs;
      zod: typeof zodNs;
      my: typeof myNs;
    };
  }
}
