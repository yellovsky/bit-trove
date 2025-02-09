// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { TutorialSegment } from '@repo/api-models';

// common modules
import { getApiClient } from '~/api/api-client';
import { getTutorialRouteLink } from '~/utils/links';
import { supportedLngs } from '~/config/i18n';
import { fetchTutorialListEP, type FetchTutorialListVariables } from '~/api/tutorial';
import { getPageParamByIndex, initialPageParam } from '~/api/pagination';

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
    const firstPage = yield* fetchTutorialListEP(apiClient)({
      pageParam: initialPageParam,
      variables: fetchTutorialVariables,
    });

    const total = firstPage.meta.pagination.total;
    const pageSize = initialPageParam.limit;
    const pagesToFetchCount = Math.ceil(total / pageSize) - 1;

    const restPages =
      pagesToFetchCount < 0
        ? []
        : yield* Effect.all(
            R.range(1, pageSize).map(index =>
              fetchTutorialListEP(apiClient)({
                pageParam: getPageParamByIndex(index),
                variables: fetchTutorialVariables,
              }),
            ),
          );

    const tutorials = [
      ...firstPage.data,
      ...restPages.map(response => response.data).flat(),
    ].filter(val => !!val);

    return tutorials.map(getTutorialUrlTag).filter(Boolean).join('\n') as any;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
