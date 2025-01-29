// global modules
import { Effect } from 'effect';

// common modules
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { getBlogPostTags } from './sitemap.blog-post';
import { getIndexTags } from './sitemap.index';

const getTags = (): Effect.Effect<string> =>
  Effect.gen(function* () {
    const tags = yield* Effect.all([getIndexTags(), getBlogPostTags()]);

    return tags.filter(Boolean).join('\n');
  });

export const loader = async () => {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${await runAsyncEffect(getTags())}
    </urlset>
  `;

  return new Response(content, {
    status: 200,

    headers: {
      'Content-Type': 'application/xml',
      encoding: 'UTF-8',
      'xml-version': '1.0',
    },
  });
};
