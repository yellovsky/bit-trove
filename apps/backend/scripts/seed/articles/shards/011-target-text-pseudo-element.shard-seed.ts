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
          text: '::target-text',
          type: 'text',
        },
        {
          text: " is a CSS pseudo-element that styles text matching the current text search. It's perfect for highlighting search results without JavaScript.",
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
          text: 'When users search for text on a page (Ctrl+F or Cmd+F), this pseudo-element automatically styles the matching text with your custom CSS.',
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
                  text: 'No JavaScript required for search highlighting',
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
                  text: 'Consistent styling across all browsers',
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
                  text: 'Works with native browser search functionality',
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
                  text: 'Improves accessibility and user experience',
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
                  text: 'Customizable appearance for your brand',
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
          text: '::target-text {\n  background: yellow;\n  color: black;\n  font-weight: bold;\n}\n\n/* Or with your brand colors */\n::target-text {\n  background: #ff6b6b;\n  color: white;\n  padding: 2px 4px;\n  border-radius: 3px;\n}',
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
          text: 'Custom Styling Examples',
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
          text: 'Different approaches to styling search results:',
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
          text: '/* Subtle highlight */\n::target-text {\n  background: rgba(255, 255, 0, 0.3);\n  text-decoration: underline wavy #ff6b6b;\n}\n\n/* High contrast */\n::target-text {\n  background: #000;\n  color: #fff;\n  box-shadow: 0 0 0 2px #000;\n}\n\n/* Animated highlight */\n::target-text {\n  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);\n  background-size: 200% 100%;\n  animation: slide 2s ease-in-out infinite;\n}\n\n@keyframes slide {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}',
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
          text: 'Currently supported in Chrome 115+, Firefox 123+, and Safari 17.4+. For older browsers, you can use JavaScript alternatives:',
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
          text: "// JavaScript fallback for older browsers\nfunction highlightSearchResults(searchTerm) {\n  const textNodes = document.evaluate(\n    '//text()[contains(., \"' + searchTerm + '\")]',\n    document,\n    null,\n    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,\n    null\n  );\n  \n  for (let i = 0; i < textNodes.snapshotLength; i++) {\n    const node = textNodes.snapshotItem(i);\n    const span = document.createElement('span');\n    span.className = 'search-highlight';\n    span.textContent = node.textContent;\n    node.parentNode.replaceChild(span, node);\n  }\n}",
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
          text: 'CSS Fallback',
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
          text: '/* Fallback for older browsers */\n.search-highlight {\n  background: yellow;\n  color: black;\n}\n\n/* Modern browsers */\n@supports (::target-text) {\n  .search-highlight {\n    background: none;\n    color: inherit;\n  }\n}',
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
                  text: 'Documentation sites',
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
                  text: 'Blog posts and articles',
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
                  text: 'Long-form content',
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
                  text: 'Technical documentation',
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
                  text: 'Any content-heavy website where users frequently search',
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
          text: 'Accessibility Benefits',
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
                  text: 'Works with screen readers and assistive technologies',
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
                  text: "Respects user's color scheme preferences",
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
                  text: 'No additional JavaScript to load or maintain',
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
                  text: 'Consistent with native browser behavior',
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
                  text: 'Improves findability for all users',
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
          text: 'A simple CSS property that makes your content more searchable and user-friendly without any JavaScript overhead.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedTargetTextPseudoElementArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-27T21:00:00.000Z');
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
        'Learn how ::target-text CSS pseudo-element automatically styles search results without JavaScript for better user experience.',
      seoKeywords:
        'css, target-text, pseudo-element, search highlighting, accessibility, user experience, browser search',
      seoTitle: '::target-text - Native Search Highlighting with CSS',
      shortDescription:
        'How to use ::target-text to automatically highlight search results with CSS, no JavaScript required.',
      slug: 'target-text-pseudo-element',
      title: '::target-text',
      type: 'shard',
    },
  });
};
