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
          text: 'text-wrap: balance',
          type: 'text',
        },
        {
          text: ' is a CSS property that automatically balances text across lines for better readability and visual appeal.',
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
          text: 'Instead of letting text wrap naturally (which can create awkward line breaks), it redistributes words to create more balanced line lengths.',
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
          text: 'Why use it?',
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
                  text: 'Eliminates awkward line breaks in headings and short text blocks',
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
                  text: 'Creates more visually appealing text layouts',
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
                  text: 'Improves readability, especially for titles and headlines',
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
                  text: 'No more manual line breaks or CSS hacks needed',
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
          text: 'h1, h2, h3 {\n  text-wrap: balance;\n}\n\n.short-text {\n  text-wrap: balance;\n  max-width: 300px;\n}',
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
          text: 'Without text-wrap: balance, a heading might break like this:',
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
          text: '/* Before */\nh1 {\n  /* text-wrap: balance; */\n}\n\n/* Result: */\n/* "Building a Better Blog with" */\n/* "Tiptap" */',
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
          text: 'With text-wrap: balance:',
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
          text: '/* After */\nh1 {\n  text-wrap: balance;\n}\n\n/* Result: */\n/* "Building a Better" */\n/* "Blog with Tiptap" */',
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
          text: 'Currently supported in Chrome 114+, Firefox 121+, and Safari 17+. For older browsers, you can use a fallback:',
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
          text: 'h1 {\n  /* Fallback for older browsers */\n  text-align: center;\n  \n  /* Modern browsers */\n  text-wrap: balance;\n}',
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
          text: 'Perfect for',
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
                  text: 'Page titles and headings',
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
                  text: 'Card titles and descriptions',
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
                  text: 'Navigation labels',
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
                  text: 'Call-to-action text',
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
                  text: 'Any short text block that needs balanced wrapping',
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
        textAlign: null,
      },
      content: [
        {
          text: 'One of those small CSS properties that makes a big difference in how your text looks and feels.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedTextWrapBalanceArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-04T21:00:00.000Z');
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
        'Learn how text-wrap: balance improves text layout by automatically balancing line lengths for better readability and visual appeal.',
      seoKeywords: 'css, text-wrap, balance, typography, text layout, readability, headings, responsive design',
      seoTitle: 'text-wrap: balance - Better Text Layout with CSS',
      shortDescription: 'How to use text-wrap: balance to create more visually appealing and readable text layouts.',
      slug: 'text-wrap-balance',
      title: 'text-wrap: balance',
      type: 'shard',
    },
  });
};
