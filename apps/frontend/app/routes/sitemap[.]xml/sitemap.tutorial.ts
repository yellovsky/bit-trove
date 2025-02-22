// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { TutorialSegment } from '@repo/api-models';

// common modules
import { getApiClient } from '~/api/api-client';
import { getTutorialRouteLink } from '~/utils/links';
import { supportedLngs } from '~/config/i18n';
import { fetchAllTutorials, type FetchTutorialListVariables } from '~/api/tutorial';

// local modules
import { generateURLTag } from './sitemap.helpers';

const getTutorialUrlTag = (tutorial: TutorialSegment): string | null => {
  const lastmod = tutorial.published_at;
  if (!lastmod) return null;

  const commonLocales = R.intersection(supportedLngs, tutorial.language_codes);

  return commonLocales
    .map(locale =>
      generateURLTag({
        lastmod,
        locale,
        pathname: getTutorialRouteLink(tutorial, locale),

        alternameLangs: commonLocales
          .filter(al => al !== locale)
          .map(hreflang => ({ hreflang, pathname: getTutorialRouteLink(tutorial, hreflang) })),
      }),
    )
    .filter(Boolean)
    .join('\n');
};

export const getTutorialTags = (): Effect.Effect<string | null> =>
  Effect.gen(function* () {
    const fetchTutorialVariables: FetchTutorialListVariables = {
      locale: 'en',
      sort: '-created_at',
    };

    const apiClient = getApiClient();
    const tutorials = yield* fetchAllTutorials(apiClient, fetchTutorialVariables);

    return tutorials.map(getTutorialUrlTag).filter(Boolean).join('\n') as any;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
