// global modules
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// common modules
import { getParamsParam } from '~/utils/loader.server';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { CMSEditTutorialPage } from './page';

interface LoaderData {
  slug: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const pipeline: Effect.Effect<LoaderData, Response> = Effect.gen(function* () {
    const slug = yield* getParamsParam('slug', params);
    return { slug };
  });

  return runAsyncEffect(pipeline);
};

export const meta = mergeMeta(() => []);

export default function CMSEditTutorialRoute() {
  const { slug } = useLoaderData<typeof loader>();
  return <CMSEditTutorialPage slug={slug} />;
}
