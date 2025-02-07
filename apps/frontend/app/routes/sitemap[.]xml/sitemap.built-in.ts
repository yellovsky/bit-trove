// global modules
import { Effect } from 'effect';

// common modules
import { supportedLngs } from '~/config/i18n';

// local modules
import { generateURLTag } from './sitemap.helpers';
import { getBlogRouteLink } from '../../utils/links';

const getIndexTags = (): Effect.Effect<string> =>
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

const getBlogTags = (): Effect.Effect<string> =>
  Effect.gen(function* () {
    return supportedLngs
      .map(locale =>
        generateURLTag({
          locale,
          pathname: getBlogRouteLink(locale),

          alternameLangs: supportedLngs
            .filter(al => al !== locale)
            .map(hreflang => ({ hreflang, pathname: getBlogRouteLink(hreflang) })),
        }),
      )
      .filter(Boolean)
      .join('\n');
  });

export const getBuiltInTags = (): Effect.Effect<string> =>
  Effect.gen(function* () {
    const tags = yield* Effect.all([getIndexTags(), getBlogTags()]);
    return tags.filter(Boolean).join('\n');
  });
