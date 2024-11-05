// global modules
import type { BlogPostListResponse } from '@repo/api-models';
import { Cause, Effect, Either } from 'effect';
import { FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { type Params, useLoaderData } from '@remix-run/react';

// common modules
import { fetchBlogPostList } from '~/api/blog-post';
import { mergeMeta } from '~/utils/meta';
import { type ApiClient, getApiClient } from '~/api/api-client';

// local modules
import { BlogPage } from './page';

interface LoaderData {
  blogPostListResponse: BlogPostListResponse;
}

const loadData = (apiClient: ApiClient, params: Params): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = params.locale;
    if (!locale) return yield* Effect.fail(new Response('Bad request', { status: 400 }));

    const eithwrBlogPostListResponse = yield* Effect.either(
      fetchBlogPostList(apiClient, {
        locale,
        page: { limit: 10, offset: 0 },
        sort: 'created_at',
      }),
    );

    if (Either.isLeft(eithwrBlogPostListResponse)) {
      if (eithwrBlogPostListResponse.left.meta.status === 404) {
        return yield* Effect.fail(new Response('Not found', { status: 404 }));
      }
      if (eithwrBlogPostListResponse.left.meta.status === 400)
        return yield* Effect.fail(new Response('Bad request', { status: 400 }));
      else return yield* Effect.fail(new Response('Internal server error', { status: 500 }));
    }

    return { blogPostListResponse: eithwrBlogPostListResponse.right };
  });

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiClient = getApiClient();

  return json<LoaderData>(
    await Effect.runPromise(loadData(apiClient, params)).catch(err => {
      if (isFiberFailure(err)) {
        const cause = err[FiberFailureCauseId];
        if (Cause.isFailType(cause) && cause.error instanceof Response) throw cause.error;
      }
      throw new Response('Internal server error', { status: 500 });
    }),
  );
};

export const meta = mergeMeta(() => []);

export default function BlogPostRoute() {
  const { blogPostListResponse } = useLoaderData<typeof loader>();
  return <BlogPage blogPostListResponse={blogPostListResponse} />;
}
