import type { PrismaClient } from '@generated/prisma';

import { calculateReadingTime } from 'src/shared/utils/reading-time';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'In this article, the following libraries are used:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'react@19.1.0',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'react-dom@19.1.0',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'react-router@7.6.3',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'When I started building server-rendered apps with React, I was drawn to the smooth navigation of single-page applications (SPAs) but also wanted the benefits of server-side rendering (SSR): fast initial load and better SEO. Fortunately, modern React Router (version 7+) supports both patterns in a unified and elegant way.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'This post explains how to build a ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Single Page Application (SPA)',
          type: 'text',
        },
        {
          text: ' with ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Server-Side Rendering (SSR)',
          type: 'text',
        },
        {
          text: ' using ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'React Router 7',
          type: 'text',
        },
        {
          text: ", which is now the core of Remix. We'll cover hydration, data loading, client navigation, and the trade-offs involved.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Why Combine SPA with SSR?',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: "If you've built SPAs before, you know the feeling: click a link, the page changes instantly, and everything feels snappy. But open that app on a slow network or view its source code, and you'll see a blank shell with a loading spinner. Not great for SEO. Not great for users on poor connections.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'SSR, on the other hand, gives you fully rendered HTML on the first load. That means better perceived performance and content that search engines and link preview bots can read. But it comes with a challenge: rendering on the server and then waking up the client version of your app.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'This is where hydration comes in.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'While static site generation (SSG) is a great fit for sites with fixed content, it falls short for apps with frequently changing data. Some frameworks offer incremental regeneration or revalidation to address this, but SSR remains a better fit when:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Data is fetched from APIs on demand.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Content changes frequently and must be fresh.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Pages are personalized or contain user-generated content.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'You want fast, dynamic first loads with SEO benefits.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'SSG wins when:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Content is mostly static and performance is critical.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'You want to use a global CDN with full HTML caching.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'You can afford delays for rebuilds or invalidations.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: "It's worth evaluating your use case carefully.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Performance Trade-Offs of SSR',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'SSR improves perceived performance by sending HTML to the client immediately. However, it introduces its own overhead:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Slower TTFB',
                  type: 'text',
                },
                {
                  text: ' (time to first byte) compared to static pages.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Increased server load',
                  type: 'text',
                },
                {
                  text: ' under high traffic.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'More complex caching',
                  type: 'text',
                },
                {
                  text: ' strategies.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: "Using SSR makes sense when the content is dynamic and must be indexed or previewed as-is. But you'll want to combine it with client-side caching (e.g., React Query) to avoid re-fetching data and minimize the server load after hydration.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Hydration: Bringing Static HTML to Life',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: "Hydration is simply the process of attaching React's behavior to already-rendered HTML. The server gives you markup, and then React on the client adds interactivity and reconnects state.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'typescript',
      },
      content: [
        {
          text: "import { hydrateRoot } from 'react-dom/client';\nimport { HydratedRouter } from 'react-router/dom';\n\nasync function hydrate() {\n  hydrateRoot(document, <HydratedRouter />);\n}\n\nif (window.requestIdleCallback) {\n  window.requestIdleCallback(hydrate);\n} else {\n  window.setTimeout(hydrate, 1);\n}",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'React recommends wrapping ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'hydrateRoot',
          type: 'text',
        },
        {
          text: ' inside ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'startTransition',
          type: 'text',
        },
        {
          text: ' to mark hydration as non-urgent. This helps the browser avoid blocking interactions during hydration.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'If hydration renders incorrectly, it’s usually due to mismatches between server and client data. Consistency is key, especially when using tools like React Query.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'In this approach, ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'React Query is the single source of truth',
          type: 'text',
        },
        {
          text: " for data. It's important that the data loaded during SSR matches what the client expects. If there's no mismatch or error, React Query will not refetch it again on the client.",
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'React Router: SSR and Client Loaders',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'React Router 7 has grown into the foundation of Remix. It includes support for data loaders, actions, meta tags, error boundaries, and more—both on the server and the client.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'Here’s what happens on the first request:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        start: 1,
      },
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Server receives the request and matches the route.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Calls the ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'loader()',
                  type: 'text',
                },
                {
                  text: ' for that route to fetch data.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Renders the app with data.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Sends the HTML and metadata to the client.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Client hydrates and takes over.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'orderedList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'React Router allows you to define both a ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'loader()',
          type: 'text',
        },
        {
          text: ' (server) and a ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'clientLoader()',
          type: 'text',
        },
        {
          text: ' (client-side navigation). The ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'clientLoader',
          type: 'text',
        },
        {
          text: ' runs only after hydration, during client-side navigation. You can unify logic across environments using a shared data loading function.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'ts',
      },
      content: [
        {
          text: 'function loadRouteData(args: Route.LoaderArgs | Route.ClientLoaderArgs) {\n  // Shared data loading logic\n}\n\nexport async function loader(args: Route.LoaderArgs) {\n  return loadRouteData(args);\n}\n\nexport async function clientLoader(args: Route.ClientLoaderArgs) {\n  return loadRouteData(args);\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'For apps with nested routes, React Router only re-invokes the loader/clientLoader for routes that have changed. This avoids redundant data fetching.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          attrs: {
            textAlign: 'left',
          },
          content: [
            {
              text: '⚠️ Note: This approach works best when your data source is ',
              type: 'text',
            },
            {
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'external to the app',
              type: 'text',
            },
            {
              text: "—like an API—not a database. In database-backed systems, you'll want to avoid accessing the DB from the browser. Instead, use server-side ",
              type: 'text',
            },
            {
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'loader()',
              type: 'text',
            },
            {
              text: 's and expose Remix-style API routes or endpoints for the client to consume.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'blockquote',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: '## Post-Hydration: Seamless SPA',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'After hydration, React Router intercepts navigation events and loads data via ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'clientLoader',
          type: 'text',
        },
        {
          text: '. You get instant client-side transitions like a traditional SPA, while still benefiting from SSR on the first load.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'ts',
      },
      content: [
        {
          text: "import { useLoaderData } from 'react-router';\n\nexport function Posts() {\n  const posts = useLoaderData();\n  return <PostList posts={posts} />;\n}",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'You can also mix SSR with client-only routes. For instance, a user dashboard doesn’t need SEO. In that case, skip ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'loader()',
          type: 'text',
        },
        {
          text: ' and use ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'useQuery',
          type: 'text',
        },
        {
          text: ' or similar hooks directly in the component.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'SEO Benefits of SSR',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'SSR helps search engines and social platforms parse your content instantly. This includes:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: '<title>',
                  type: 'text',
                },
                {
                  text: ' and ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: '<meta name="description">',
                  type: 'text',
                },
                {
                  text: ' tags.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Open Graph (`og:`) and Twitter card metadata for previews.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Content headings, rich snippets, and structured data.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'To ensure proper SEO:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Render meta tags on the server.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Avoid data mismatches between server and client.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Use tools like ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'react-helmet',
                  type: 'text',
                },
                {
                  text: ' or ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: '<Meta />',
                  type: 'text',
                },
                {
                  text: ' in Remix-compatible routes.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'A Complete Showcase: React Router + React Query + SSR',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'This example demonstrates how to:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Share data loading logic across server and client.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Use React Query with hydration.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
        {
          content: [
            {
              attrs: {
                textAlign: 'left',
              },
              content: [
                {
                  text: 'Generate meta tags based on loaded data.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'tsx',
      },
      content: [
        {
          text: "// routes/index.tsx\nimport type { Route } from './+types';\nimport { dehydrate, HydrationBoundary } from '@tanstack/react-query';\n\nasync function loadHomeRouteData(args: Route.LoaderArgs | Route.ClientLoaderArgs) {\n  const apiClient = getApiClient();\n  const queryClient = getQueryClient();\n  \n  const blogPostsFetchParams = {\n    locale: args.params.locale,\n    sort: '-createdAt',\n  };\n\n  await prefetchInfiniteShardsQuery(apiClient, queryClient, blogPostsFetchParams);\n  \n  return {\n    blogPostsFetchParams,\n    dehydratedState: dehydrate(queryClient),\n  };\n}\n\nexport async function loader(args: Route.LoaderArgs) {\n  return loadHomeRouteData(args);\n}\n\nexport async function clientLoader(args: Route.ClientLoaderArgs) {\n  return loadHomeRouteData(args);\n}\n\nexport function meta(args: Route.MetaArgs) {\n  if (!args.data) return [];\n\n  return [\n    // Build meta tags here\n  ];\n}\n\nconst Page = ({ fetchParams }: { fetchParams: FetchParams }) => {\n  const query = useQuery({\n    queryFn: () => fetchBlogPosts(fetchParams),\n    queryKey: ['blog_posts', fetchParams],\n  });\n\n  return (\n    <div>\n      <PostList posts={query.data} />\n    </div>\n  );\n};\n\nexport default function RouteComponent() {\n  const { dehydratedState, blogPostsFetchParams } = useLoaderData<typeof loader>();\n\n  return (\n    <HydrationBoundary state={dehydratedState}>\n      <Page fetchParams={blogPostsFetchParams} />\n    </HydrationBoundary>\n  );\n}",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'This demonstrates the complete pipeline: server-side loading, hydration, client-side transitions, and SEO-friendly metadata.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Wrapping Up',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'With React Router 7, you can build apps that deliver fast, indexable pages on first load and behave like snappy SPAs afterward. You write unified loaders, hydrate cleanly into the client, and gain full control over data, layout, and SEO.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          text: 'While this model requires careful data consistency and infrastructure setup, it gives you the best of both SSR and client-driven interactions. For apps powered by APIs, it’s a flexible and modern approach that scales well across use cases.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedSpaWithSsrBlogPost = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-07-07T11:37:20.022Z');
  const publishedAt = createdAt;

  const entry = await tx.blogPostEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  const title = 'React Router: Building SPAs with Server-Side Rendering';
  const shortDescription =
    'A practical guide to using SSR and hydration with React Router to build fast, SEO-friendly SPAs—complete with real-world tips, examples, and answers to common developer questions.';

  const readingTime = calculateReadingTime(contentJSON, title, shortDescription);

  await tx.blogPost.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'en',
      publishedAt,
      readingTime,
      seoDescription:
        'Learn how to combine Server-Side Rendering (SSR) with React Router to build fast, SEO-friendly single-page applications. Understand hydration, loaders, client-side navigation, caching, and common pitfalls.',
      seoKeywords: 'react, react-router, ssr, hydration, spa, seo, remix, web-performance, frontend, data-fetching',
      seoTitle: title,
      shortDescription,
      slug: 'react-router-building-spas-with-server-side-rendering',
      title,
    },
  });
};
