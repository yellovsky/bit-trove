// global modules
import type { BlogPost } from '@repo/api-models';
import { Cause, Effect, Either } from 'effect';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { type Params, useLoaderData } from '@remix-run/react';

// common modules
import { fetchBlogPost } from '~/api/blog-post/blog-post.fetch';
import { mergeMeta } from '~/utils/meta';
import { type ApiClient, getApiClient } from '~/api/api-client';
import { FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';

interface LoaderData {
  blogPost: BlogPost;
}

const loadData = (apiClient: ApiClient, params: Params): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const slug = params.slug;
    if (!slug) return yield* Effect.fail(new Response('Bad request', { status: 400 }));

    const blogPostResponse = yield* Effect.either(fetchBlogPost(apiClient, slug));

    if (Either.isLeft(blogPostResponse)) {
      if (blogPostResponse.left.meta.status === 404) {
        return yield* Effect.fail(new Response('Not found', { status: 404 }));
      }
      if (blogPostResponse.left.meta.status === 400)
        return yield* Effect.fail(new Response('Bad request', { status: 400 }));
      else return yield* Effect.fail(new Response('Internal server error', { status: 500 }));
    }

    return { blogPost: blogPostResponse.right.data };
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
  const { blogPost } = useLoaderData<typeof loader>();

  return (
    <div>
      Blog post route
      <br />
      {JSON.stringify(blogPost, null, 2)}
    </div>
  );
}
