/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: it's a seed */
import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../../account.seed';

const contentJSON = {
  content: [
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'scrollbar-gutter',
          type: 'text',
        },
        {
          text: ' is a CSS property that reserves space for scrollbars to prevent layout shift when they appear or disappear.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'This solves the common problem where content jumps when scrollbars appear, creating a jarring user experience.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'The Problem',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Without scrollbar-gutter, when content becomes scrollable, the scrollbar appears and reduces the available width, causing the layout to shift. This is especially noticeable on:',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Pages with dynamic content that changes height',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Modals that appear/disappear',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Responsive layouts that adapt to content',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Any interface where scrollbars can appear unexpectedly',
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
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Basic Usage',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* Reserve space for scrollbars */\nbody {\n  scrollbar-gutter: stable;\n}\n\n/* Or on specific containers */\n.scrollable-content {\n  scrollbar-gutter: stable;\n  overflow-y: auto;\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Values',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'auto',
                  type: 'text',
                },
                {
                  text: ' - Default behavior (no space reserved)',
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
                textAlign: null,
              },
              content: [
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'stable',
                  type: 'text',
                },
                {
                  text: ' - Always reserve space for scrollbars',
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
                textAlign: null,
              },
              content: [
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'stable both-edges',
                  type: 'text',
                },
                {
                  text: ' - Reserve space on both sides (for RTL languages)',
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
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Before vs After',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Without scrollbar-gutter:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* Before - Layout shifts when scrollbar appears */\nbody {\n  /* scrollbar-gutter: auto; */\n}\n\n/* Result: */\n/* Content width: 100% -> 100% - scrollbar width */\n/* Layout jumps when content becomes scrollable */',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'With scrollbar-gutter:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* After - Consistent layout */\nbody {\n  scrollbar-gutter: stable;\n}\n\n/* Result: */\n/* Content width: 100% - scrollbar width (always) */\n/* No layout shift when scrollbars appear */',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Perfect Use Cases',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      content: [
        {
          content: [
            {
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: 'Full-height layouts and dashboards',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Modal dialogs with dynamic content',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Sidebar navigation that can scroll',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Content areas that expand/collapse',
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
                textAlign: null,
              },
              content: [
                {
                  text: 'Any layout where scrollbars might appear',
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
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Advanced Example',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* Dashboard layout with stable scrollbars */\n.dashboard {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  height: 100vh;\n}\n\n.sidebar {\n  scrollbar-gutter: stable;\n  overflow-y: auto;\n  padding: 1rem;\n}\n\n.main-content {\n  scrollbar-gutter: stable;\n  overflow-y: auto;\n  padding: 2rem;\n}\n\n/* Ensure consistent spacing */\nbody {\n  scrollbar-gutter: stable;\n  margin: 0;\n  padding: 0;\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'Browser Support',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'Supported in Chrome 94+, Firefox 97+, and Safari 16+. For older browsers, you can use CSS custom properties as a fallback:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* Fallback for older browsers */\n:root {\n  --scrollbar-width: 0px;\n}\n\n@supports (scrollbar-gutter: stable) {\n  :root {\n    --scrollbar-width: 0px; /* No additional space needed */\n  }\n}\n\n/* Apply to containers */\n.scrollable {\n  width: calc(100% - var(--scrollbar-width));\n  overflow-y: auto;\n}',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        level: 2,
        textAlign: 'left',
      },
      content: [
        {
          text: 'JavaScript Detection',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'For older browsers, you can detect scrollbar width and apply it manually:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: "function getScrollbarWidth() {\n  const outer = document.createElement('div');\n  outer.style.visibility = 'hidden';\n  outer.style.overflow = 'scroll';\n  document.body.appendChild(outer);\n  \n  const inner = document.createElement('div');\n  outer.appendChild(inner);\n  \n  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;\n  outer.parentNode.removeChild(outer);\n  \n  return scrollbarWidth;\n}\n\n// Apply to CSS custom property\nif (!CSS.supports('scrollbar-gutter', 'stable')) {\n  document.documentElement.style.setProperty(\n    '--scrollbar-width', \n    getScrollbarWidth() + 'px'\n  );\n}",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: 'A simple CSS property that eliminates one of the most annoying layout issues in web development. Your users will thank you.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedScrollbarGutterArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-04-24T21:00:00.000Z');
  const publishedAt = createdAt;

  const entry = await tx.articleEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  await tx.article.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'en',
      publishedAt,
      seoDescription:
        'Learn how scrollbar-gutter prevents layout shift by reserving space for scrollbars, creating a more stable user experience.',
      seoKeywords:
        'css, scrollbar-gutter, layout shift, user experience, responsive design, scrollbars, web development',
      seoTitle: 'scrollbar-gutter - Prevent Layout Shift with CSS',
      shortDescription: 'How to use scrollbar-gutter to prevent content jumping when scrollbars appear or disappear.',
      slug: 'scrollbar-gutter',
      title: 'scrollbar-gutter',
      type: 'shard',
    },
  });
};
