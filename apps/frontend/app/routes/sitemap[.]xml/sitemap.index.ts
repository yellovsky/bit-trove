// global modules
import { Effect } from 'effect';

// common modules
import { supportedLngs } from '~/config/i18n';

// local modules
import { generateURLTag } from './sitemap.helpers';

export const getIndexTags = (): Effect.Effect<string> =>
  Effect.gen(function* () {
    return supportedLngs
      .map(locale =>
        generateURLTag({
          locale,
          pathname: `/${locale}`,

          alternameLangs: supportedLngs
            .filter(al => al !== locale)
            .map(hreflang => ({ hreflang, pathname: `/${hreflang}` })),
        }),
      )
      .filter(Boolean)
      .join('\n');
  });
