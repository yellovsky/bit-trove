import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

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
          text: 'field-sizing: content',
          type: 'text',
        },
        {
          text: ' is a CSS property that makes form fields automatically size themselves to their content, creating a more dynamic and responsive form experience.',
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
          text: 'Instead of fixed-width inputs that might be too small or too large, fields grow and shrink based on what the user types.',
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
                  text: 'Creates more intuitive form interactions',
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
                  text: 'Saves space by not reserving unnecessary width',
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
                  text: 'Provides visual feedback as users type',
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
                  text: 'Eliminates the need for complex width calculations',
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
                  text: 'Works great for search boxes, tags, and dynamic content',
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
          text: 'input {\n  field-sizing: content;\n  min-width: 2ch;\n  max-width: 100%;\n}\n\n/* For specific input types */\ninput[type="search"] {\n  field-sizing: content;\n  min-width: 8ch;\n}',
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
          text: 'Traditional fixed-width approach:',
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
          text: '/* Before - Fixed width */\n.search-input {\n  width: 200px;\n  /* Always 200px, regardless of content */\n}\n\n/* Result: */\n/* [Search...     ] <- lots of empty space */\n/* [Search for something specific...] <- might be too narrow */',
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
          text: 'With field-sizing: content:',
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
          text: '/* After - Content-based sizing */\n.search-input {\n  field-sizing: content;\n  min-width: 8ch;\n  max-width: 100%;\n}\n\n/* Result: */\n/* [Search] <- compact when empty */\n/* [Search for something specific] <- grows with content */',
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
                  text: 'Search boxes that start small and grow',
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
                  text: 'Tag input fields',
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
                  text: 'Dynamic form fields (like adding items to a list)',
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
                  text: 'Inline editing interfaces',
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
                  text: 'Any input where content length varies significantly',
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
          text: '/* Tag input with dynamic sizing */\n.tag-input {\n  field-sizing: content;\n  min-width: 4ch;\n  max-width: 300px;\n  padding: 0.5rem;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n/* Smooth transitions */\n.tag-input {\n  transition: width 0.2s ease;\n}',
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
          text: 'Currently supported in Chrome 123+, Firefox 127+, and Safari 17.4+. For older browsers, you can use JavaScript or CSS alternatives:',
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
          text: '/* Fallback approach */\ninput {\n  width: auto;\n  min-width: 2ch;\n}\n\n/* Modern browsers */\n@supports (field-sizing: content) {\n  input {\n    field-sizing: content;\n  }\n}',
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
          text: 'JavaScript Alternative',
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
          text: 'For older browsers, you can achieve similar behavior with JavaScript:',
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
          text: "function autoResizeInput(input) {\n  const span = document.createElement('span');\n  span.style.visibility = 'hidden';\n  span.style.position = 'absolute';\n  span.style.whiteSpace = 'pre';\n  \n  // Copy input styles\n  const styles = window.getComputedStyle(input);\n  span.style.font = styles.font;\n  span.style.padding = styles.padding;\n  \n  document.body.appendChild(span);\n  \n  function updateWidth() {\n    span.textContent = input.value || input.placeholder;\n    input.style.width = span.offsetWidth + 'px';\n  }\n  \n  input.addEventListener('input', updateWidth);\n  updateWidth();\n}",
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
          text: 'A small CSS property that makes forms feel more responsive and user-friendly. Perfect for modern, dynamic interfaces.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedFieldSizingContentShard = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-10T21:00:00.000Z');
  const publishedAt = createdAt;

  const entry = await tx.shardEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  await tx.shard.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'en',
      publishedAt,
      seoDescription:
        'Learn how field-sizing: content creates dynamic form fields that automatically size to their content for better user experience.',
      seoKeywords:
        'css, field-sizing, content, form inputs, responsive forms, dynamic sizing, user experience, web forms',
      seoTitle: 'field-sizing: content - Dynamic Form Fields with CSS',
      shortDescription:
        'How to use field-sizing: content to create form fields that automatically adjust their width based on content.',
      slug: 'field-sizing-content',
      title: 'field-sizing: content',
    },
  });
};
