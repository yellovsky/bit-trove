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
          text: 'oklch()',
          type: 'text',
        },
        {
          text: " is a modern color space that's perceptually uniform and better for animations. It represents colors using Lightness, Chroma, and Hue.",
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
          text: 'Unlike RGB or HSL, oklch provides consistent brightness across different hues and better color interpolation. Browsers may render SDR colors differently on the same screen, making consistent color reproduction challenging.',
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
          text: 'Why oklch?',
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
                  text: 'Perceptually uniform - consistent brightness across hues',
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
                  text: 'Better color interpolation for animations',
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
                  text: 'More intuitive color adjustments',
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
                  text: 'Future-proof for HDR displays',
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
                  text: 'Matches how humans perceive color',
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
                  text: 'Consistent across different displays and lighting conditions',
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
          text: 'Syntax',
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
          text: 'oklch(lightness chroma hue)\noklch(lightness chroma hue / alpha)\n\n/* Examples */\noklch(0.7 0.2 240)     /* Blue */\noklch(0.8 0.15 120)    /* Green */\noklch(0.6 0.25 0)      /* Red */\noklch(0.5 0.1 0 / 0.8) /* Semi-transparent gray */',
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
          text: 'Parameters',
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
                  text: 'lightness',
                  type: 'text',
                },
                {
                  text: ' - 0 (black) to 1 (white)',
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
                  text: 'chroma',
                  type: 'text',
                },
                {
                  text: ' - 0 (gray) to ~0.4 (maximum saturation)',
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
                  text: 'hue',
                  type: 'text',
                },
                {
                  text: ' - 0-360 degrees (same as HSL)',
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
                  text: 'alpha',
                  type: 'text',
                },
                {
                  text: ' - 0 (transparent) to 1 (opaque)',
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
          text: 'Traditional color spaces vs oklch:',
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
          text: '/* Before - RGB/HSL inconsistencies */\n.button {\n  background: rgb(255, 0, 0);      /* Red */\n  color: rgb(0, 255, 0);           /* Green - appears brighter! */\n}\n\n/* After - Consistent perceived brightness */\n.button {\n  background: oklch(0.6 0.25 0);   /* Red */\n  color: oklch(0.6 0.25 120);      /* Green - same perceived brightness */\n}',
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
          text: 'Color Palettes',
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
          text: ':root {\n  /* Primary colors - consistent lightness */\n  --primary: oklch(0.6 0.25 240);\n  --secondary: oklch(0.6 0.25 120);\n  --accent: oklch(0.6 0.25 0);\n  \n  /* Grays - varying lightness, no chroma */\n  --gray-100: oklch(0.95 0 0);\n  --gray-200: oklch(0.9 0 0);\n  --gray-300: oklch(0.8 0 0);\n  --gray-400: oklch(0.7 0 0);\n  --gray-500: oklch(0.6 0 0);\n  --gray-600: oklch(0.5 0 0);\n  --gray-700: oklch(0.4 0 0);\n  --gray-800: oklch(0.3 0 0);\n  --gray-900: oklch(0.2 0 0);\n}',
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
          text: 'Animations',
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
          text: "oklch provides smooth color transitions because it's perceptually uniform:",
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
          text: '.animated-button {\n  background: oklch(0.6 0.25 240); /* Blue */\n  transition: background 0.3s ease;\n}\n\n.animated-button:hover {\n  background: oklch(0.6 0.25 120); /* Green - smooth transition */\n}\n\n/* Compare with HSL - less smooth */\n.old-button {\n  background: hsl(240 100% 50%);\n  transition: background 0.3s ease;\n}\n\n.old-button:hover {\n  background: hsl(120 100% 50%); /* Brightness changes during transition */\n}',
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
          text: 'Color Functions',
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
          text: '/* Lighten/darken while maintaining hue */\n.light-variant {\n  background: oklch(0.8 0.25 240); /* Lighter blue */\n}\n\n.dark-variant {\n  background: oklch(0.4 0.25 240); /* Darker blue */\n}\n\n/* Adjust saturation */\n.muted {\n  background: oklch(0.6 0.1 240); /* Less saturated */\n}\n\n.vibrant {\n  background: oklch(0.6 0.35 240); /* More saturated */\n}\n\n/* Color mixing */\n.mixed {\n  background: color-mix(in oklch, blue 50%, red 50%);\n}',
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
          text: 'Supported in Chrome 111+, Firefox 113+, and Safari 16.4+. For older browsers, provide fallbacks:',
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
          text: '.modern-color {\n  background: #007acc; /* Fallback */\n  background: oklch(0.6 0.25 240); /* Modern browsers */\n}\n\n/* Or use @supports */\n@supports (color: oklch(0 0 0)) {\n  .modern-color {\n    background: oklch(0.6 0.25 240);\n  }\n}',
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
          text: 'Color Conversion',
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
          text: 'You can convert between color spaces using CSS color functions:',
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
          text: '/* Convert hex to oklch */\n.converted {\n  background: oklch(from #007acc);\n}\n\n/* Convert RGB to oklch */\n.converted {\n  background: oklch(from rgb(0 122 204));\n}\n\n/* Convert HSL to oklch */\n.converted {\n  background: oklch(from hsl(210 100% 40%));\n}',
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
          text: 'Design System Integration',
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
          text: '/* Semantic color tokens */\n:root {\n  --color-primary: oklch(0.6 0.25 240);\n  --color-success: oklch(0.6 0.25 120);\n  --color-warning: oklch(0.6 0.25 60);\n  --color-error: oklch(0.6 0.25 0);\n  \n  /* Consistent lightness across all colors */\n  --color-primary-light: oklch(0.8 0.25 240);\n  --color-primary-dark: oklch(0.4 0.25 240);\n}\n\n.button {\n  background: var(--color-primary);\n  color: oklch(0.95 0.01 240); /* Near-white with slight tint */\n}',
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
                  text: 'Design systems requiring consistent color relationships',
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
                  text: 'Animations and transitions',
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
                  text: 'Dark/light mode implementations',
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
                  text: 'Accessible color palettes',
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
                  text: 'Future-proof color management',
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
                  text: 'Any project where color consistency matters',
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
          text: 'A modern color space that finally matches how humans perceive color, making your designs more consistent and your animations smoother.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedOklchColorSpaceShard = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-15T21:00:00.000Z');
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
        'Learn how oklch color space provides perceptually uniform colors for better animations and consistent color reproduction across displays.',
      seoKeywords:
        'oklch, color space, css colors, color theory, animations, design systems, color consistency, modern css',
      seoTitle: 'oklch() - Modern Color Space for Better Design',
      shortDescription: 'How to use oklch color space for perceptually uniform colors and smooth animations.',
      slug: 'oklch-color-space',
      title: 'oklch()',
    },
  });
};
