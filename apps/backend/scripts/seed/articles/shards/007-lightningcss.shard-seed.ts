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
          text: 'LightningCSS',
          type: 'text',
        },
        {
          text: " is a Rust-based CSS processor that's significantly faster than PostCSS and supports modern CSS features with automatic polyfilling for older browsers.",
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
          text: 'It can parse, transform, and minify CSS while providing features like nesting, custom properties, and modern selectors with automatic fallbacks.',
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
          text: 'Why LightningCSS?',
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
                  text: '10-100x faster than PostCSS',
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
                  text: 'Written in Rust for performance and safety',
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
                  text: 'Built-in polyfilling for older browsers',
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
                  text: 'Supports modern CSS features out of the box',
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
                  text: 'Smaller bundle sizes through better minification',
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
                  text: 'No JavaScript runtime overhead',
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
                  text: 'Works as a drop-in replacement for PostCSS',
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
          text: 'Installation',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'bash',
      },
      content: [
        {
          text: '# npm\nnpm install lightningcss-cli\n\n# yarn\n yarn add lightningcss-cli\n\n# pnpm\npnpm add lightningcss-cli\n\n# Or for Node.js API\nnpm install lightningcss',
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
        language: 'bash',
      },
      content: [
        {
          text: '# Process a single file\nlightningcss input.css -o output.css\n\n# Watch mode\nlightningcss input.css -o output.css --watch\n\n# Minify\nlightningcss input.css -o output.css --minify\n\n# With browser targets\nlightningcss input.css -o output.css --targets ">= 0.25%"',
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
          text: 'Configuration',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'json',
      },
      content: [
        {
          text: '{\n  "targets": ">= 0.25%",\n  "include": "CSS Nesting",\n  "exclude": "CSS Logical Properties",\n  "minify": true,\n  "sourceMap": true,\n  "cssModules": true,\n  "drafts": {\n    "customMedia": true,\n    "nesting": true\n  }\n}',
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
          text: 'Modern CSS Features',
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
          text: 'LightningCSS supports many modern CSS features with automatic polyfilling:',
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
          text: '/* CSS Nesting */\n.button {\n  background: blue;\n  \n  &:hover {\n    background: darkblue;\n  }\n  \n  &.primary {\n    background: green;\n  }\n}\n\n/* Custom Properties with fallbacks */\n:root {\n  --accent-color: #007acc;\n}\n\n.element {\n  color: var(--accent-color, #007acc);\n}\n\n/* Modern selectors */\n.card:has(.title) {\n  border: 1px solid #ccc;\n}\n\n/* Container queries */\n@container (min-width: 400px) {\n  .responsive {\n    font-size: 1.2em;\n  }\n}',
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
          text: 'Build Tool Integration',
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
          text: 'LightningCSS integrates with popular build tools:',
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
          text: "// Vite\nimport { defineConfig } from 'vite';\nimport lightningcss from 'vite-plugin-lightningcss';\n\nexport default defineConfig({\n  plugins: [\n    lightningcss({\n      browserslist: '>= 0.25%',\n      include: 'CSS Nesting',\n      minify: true\n    })\n  ]\n});\n\n// Webpack\nconst LightningCSSPlugin = require('lightningcss-loader');\n\nmodule.exports = {\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          'style-loader',\n          {\n            loader: 'lightningcss-loader',\n            options: {\n              targets: '>= 0.25%',\n              minify: true\n            }\n          }\n        ]\n      }\n    ]\n  }\n};",
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
          text: 'Performance Comparison',
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
          text: 'LightningCSS vs PostCSS performance (typical results):',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'bash',
      },
      content: [
        {
          text: '# LightningCSS\nlightningcss input.css -o output.css\n# Time: ~50ms\n\n# PostCSS with similar features\npostcss input.css -o output.css\n# Time: ~500ms\n\n# 10x faster processing!',
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
          text: 'Migration from PostCSS',
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
          text: 'Migrating from PostCSS is straightforward:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'json',
      },
      content: [
        {
          text: '// Before: postcss.config.js\nmodule.exports = {\n  plugins: [\n    require(\'postcss-nested\'),\n    require(\'autoprefixer\'),\n    require(\'cssnano\')\n  ]\n};\n\n// After: lightningcss.config.json\n{\n  "targets": ">= 0.25%",\n  "include": "CSS Nesting",\n  "minify": true\n}',
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
          text: 'Advanced Features',
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
          text: '/* CSS Modules support */\n.button {\n  background: blue;\n}\n\n/* Becomes: */\n/* .button_abc123 { background: blue; } */\n\n/* Custom media queries */\n@custom-media --mobile (width <= 768px);\n\n@media (--mobile) {\n  .container {\n    padding: 1rem;\n  }\n}\n\n/* Logical properties with fallbacks */\n.element {\n  margin-block: 1rem;\n  margin-inline: auto;\n}',
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
          text: 'LightningCSS automatically generates polyfills based on your browser targets. You can specify targets using:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'bash',
      },
      content: [
        {
          text: '# Browserlist string\nlightningcss input.css --targets ">= 0.25%, not dead"\n\n# Specific browsers\nlightningcss input.css --targets "chrome >= 90, firefox >= 88"\n\n# No polyfills (modern only)\nlightningcss input.css --targets "chrome >= 120, firefox >= 120"',
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
                  text: 'Large CSS codebases that need fast processing',
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
                  text: 'Projects requiring modern CSS with older browser support',
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
                  text: 'Build pipelines where performance matters',
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
                  text: 'Teams wanting to reduce JavaScript dependencies',
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
                  text: 'Any project currently using PostCSS',
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
          text: 'A game-changer for CSS processing that combines modern features with exceptional performance. Your build times will thank you.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedLightningcssArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-21T21:00:00.000Z');
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
        'Learn how LightningCSS provides 10-100x faster CSS processing with modern features and automatic polyfilling for older browsers.',
      seoKeywords:
        'lightningcss, css processor, postcss, rust, performance, build tools, css nesting, polyfills, web development',
      seoTitle: 'LightningCSS - Fast CSS Processing with Rust',
      shortDescription:
        'How LightningCSS provides faster CSS processing with modern features and automatic browser polyfilling.',
      slug: 'lightningcss',
      title: 'LightningCSS',
      type: 'shard',
    },
  });
};
