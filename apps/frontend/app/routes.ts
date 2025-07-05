import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  layout(
    'pages/home/layout.tsx',
    prefix(':locale', [
      index('pages/home/index.tsx'),

      ...prefix('auth', [
        route('sign-in', 'features/auth/pages/SignInPage.tsx'),
        route('sign-up', 'features/auth/pages/SignUpPage.tsx'),
        route('forgot-password', 'features/auth/pages/ForgotPasswordPage.tsx'),
      ]),

      route('editor', 'pages/editor/index.tsx'),

      ...prefix('shards', [index('pages/shards/index.tsx'), route(':slugOrId', 'pages/shard/index.tsx')]),

      ...prefix('blog', [index('pages/blog/index.tsx'), route(':slugOrId', 'pages/blog-post/index.tsx')]),

      layout(
        'pages/cms/layout.tsx',
        prefix('cms', [
          index('pages/cms/index.tsx'),
          route('shards', 'pages/cms.shards/index.tsx'),
          route('shards/create', 'pages/cms.shards.create/index.tsx'),
          route('shards/:id/edit', 'pages/cms.shards.edit/index.tsx'),
          route('blog-posts', 'pages/cms.blog-posts/index.tsx'),
          route('blog-posts/create', 'pages/cms.blog-posts.create/index.tsx'),
          route('blog-posts/:id/edit', 'pages/cms.blog-posts.edit/index.tsx'),
        ])
      ),

      route('*', 'pages/not-found/index.tsx'),
    ])
  ),
] satisfies RouteConfig;
