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
          text: 'enterkeyhint',
          type: 'text',
        },
        {
          text: ' is an HTML attribute that tells mobile keyboards what the enter key should do, improving the user experience on forms and search interfaces.',
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
          text: 'Instead of a generic "return" key, users get contextually appropriate actions like "search", "send", "go", or "done".',
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
                  text: 'Improves mobile user experience',
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
                  text: 'Provides contextual keyboard actions',
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
                  text: 'Reduces user confusion about what enter does',
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
                  text: 'Makes forms feel more native',
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
                  text: 'Works across all major mobile browsers',
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
                  text: 'No JavaScript required',
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
          text: 'Available Values',
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
                  text: 'enter',
                  type: 'text',
                },
                {
                  text: ' - Default "return" key',
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
                  text: 'done',
                  type: 'text',
                },
                {
                  text: ' - "Done" button (closes keyboard)',
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
                  text: 'go',
                  type: 'text',
                },
                {
                  text: ' - "Go" button (navigation)',
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
                  text: 'next',
                  type: 'text',
                },
                {
                  text: ' - "Next" button (form progression)',
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
                  text: 'previous',
                  type: 'text',
                },
                {
                  text: ' - "Previous" button',
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
                  text: 'search',
                  type: 'text',
                },
                {
                  text: ' - "Search" button',
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
                  text: 'send',
                  type: 'text',
                },
                {
                  text: ' - "Send" button (messages)',
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
        language: 'html',
      },
      content: [
        {
          text: '<!-- Search input -->\n<input \n  type="search" \n  placeholder="Search..." \n  enterkeyhint="search"\n/>\n\n<!-- Message input -->\n<input \n  type="text" \n  placeholder="Type a message..." \n  enterkeyhint="send"\n/>\n\n<!-- Form field -->\n<input \n  type="text" \n  placeholder="Username" \n  enterkeyhint="next"\n/>\n<input \n  type="password" \n  placeholder="Password" \n  enterkeyhint="done"\n/>',
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
          text: 'Real-World Examples',
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
          text: 'Common use cases and their appropriate enterkeyhint values:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'html',
      },
      content: [
        {
          text: '<!-- E-commerce search -->\n<input \n  type="search" \n  placeholder="Search products..." \n  enterkeyhint="search"\n/>\n\n<!-- Contact form -->\n<input type="text" placeholder="Name" enterkeyhint="next" />\n<input type="email" placeholder="Email" enterkeyhint="next" />\n<textarea placeholder="Message" enterkeyhint="send"></textarea>\n\n<!-- Login form -->\n<input type="email" placeholder="Email" enterkeyhint="next" />\n<input type="password" placeholder="Password" enterkeyhint="done" />\n\n<!-- URL input -->\n<input \n  type="url" \n  placeholder="Enter website URL" \n  enterkeyhint="go"\n/>',
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
          text: 'Form Flow Example',
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
          text: 'Creating a logical flow through a multi-step form:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'html',
      },
      content: [
        {
          text: '<form>\n  <!-- Step 1: Personal Info -->\n  <input type="text" placeholder="First Name" enterkeyhint="next" />\n  <input type="text" placeholder="Last Name" enterkeyhint="next" />\n  <input type="email" placeholder="Email" enterkeyhint="next" />\n  \n  <!-- Step 2: Address -->\n  <input type="text" placeholder="Street Address" enterkeyhint="next" />\n  <input type="text" placeholder="City" enterkeyhint="next" />\n  <input type="text" placeholder="State" enterkeyhint="next" />\n  <input type="text" placeholder="ZIP Code" enterkeyhint="done" />\n</form>',
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
          text: 'JavaScript Integration',
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
          text: 'You can dynamically set enterkeyhint based on form context:',
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
          text: "// Set enterkeyhint based on input type\nfunction setEnterKeyHint(input) {\n  const type = input.type;\n  const placeholder = input.placeholder?.toLowerCase();\n  \n  if (type === 'search' || placeholder?.includes('search')) {\n    input.enterkeyhint = 'search';\n  } else if (type === 'email' || placeholder?.includes('email')) {\n    input.enterkeyhint = 'next';\n  } else if (type === 'password') {\n    input.enterkeyhint = 'done';\n  } else if (placeholder?.includes('message') || placeholder?.includes('comment')) {\n    input.enterkeyhint = 'send';\n  } else {\n    input.enterkeyhint = 'next';\n  }\n}\n\n// Apply to all inputs\ndocument.querySelectorAll('input, textarea').forEach(setEnterKeyHint);",
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
          text: 'React Example',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'tsx',
      },
      content: [
        {
          text: "interface InputProps {\n  type?: string;\n  placeholder?: string;\n  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';\n}\n\nfunction SmartInput({ type = 'text', placeholder, enterKeyHint, ...props }: InputProps) {\n  const getEnterKeyHint = () => {\n    if (enterKeyHint) return enterKeyHint;\n    \n    if (type === 'search') return 'search';\n    if (type === 'email') return 'next';\n    if (type === 'password') return 'done';\n    if (placeholder?.toLowerCase().includes('message')) return 'send';\n    \n    return 'next';\n  };\n  \n  return (\n    <input\n      type={type}\n      placeholder={placeholder}\n      enterKeyHint={getEnterKeyHint()}\n      {...props}\n    />\n  );\n}",
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
          text: "Supported in iOS Safari 12.2+, Chrome for Android 66+, and most modern mobile browsers. On desktop, it's gracefully ignored.",
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
          text: 'Best Practices',
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
                  text: 'Use "search" for search inputs',
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
                  text: 'Use "send" for message/comment inputs',
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
                  text: 'Use "next" for form fields that lead to another field',
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
                  text: 'Use "done" for the last field in a form',
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
                  text: 'Use "go" for navigation inputs (URLs, addresses)',
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
                  text: "Consider the user's mental model when choosing values",
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
          text: 'A small HTML attribute that makes a big difference in mobile user experience. Your users will appreciate the contextual keyboard actions.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedEnterkeyhintAttributeArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-11T21:00:00.000Z');
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
        'Learn how to use the enterkeyhint HTML attribute to provide contextual keyboard actions for better mobile user experience.',
      seoKeywords:
        'html, enterkeyhint, mobile, keyboard, user experience, forms, input, accessibility, mobile development',
      seoTitle: 'enterkeyhint - Better Mobile Keyboard Experience',
      shortDescription:
        'How to use enterkeyhint to provide contextual keyboard actions for improved mobile form experience.',
      slug: 'enterkeyhint-attribute',
      title: 'enterkeyhint',
      type: 'shard',
    },
  });
};
