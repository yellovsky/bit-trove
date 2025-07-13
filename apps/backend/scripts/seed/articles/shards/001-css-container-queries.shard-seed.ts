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
          text: 'Container Queries',
          type: 'text',
        },
        {
          text: ' allow you to style elements based on the size of their container, not just the viewport. This enables truly responsive components that adapt to their context.',
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
          text: 'Unlike media queries that respond to viewport size, container queries let components adapt to their parent container. This is perfect for reusable components, cards, and layouts that need to work in different contexts.',
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
          text: 'The Problem with Media Queries',
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
          text: 'Media queries only respond to viewport size, making components rigid:',
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
          text: '/* ❌ Media queries only know about viewport */\n.card {\n  display: flex;\n  flex-direction: column;\n}\n\n@media (min-width: 768px) {\n  .card {\n    flex-direction: row; /* Always horizontal on wide viewports */\n  }\n}\n\n/* Problem: Card is horizontal even in narrow sidebar! */',
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
          text: 'Container Query Solution',
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
          text: '/* ✅ Container queries respond to parent size */\n.card-container {\n  container-type: inline-size;\n  container-name: card;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n}\n\n@container card (min-width: 400px) {\n  .card {\n    flex-direction: row; /* Horizontal when container is wide */\n  }\n}\n\n/* Now card adapts to its container, not viewport! */',
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
          text: 'Container Types',
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
          text: 'Three types of containers you can query:',
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
          text: '/* Size containers - query width and height */\n.size-container {\n  container-type: size;\n}\n\n/* Inline-size containers - query width only */\n.inline-container {\n  container-type: inline-size;\n}\n\n/* Block-size containers - query height only */\n.block-container {\n  container-type: block-size;\n}\n\n/* Normal containers - query both (default) */\n.normal-container {\n  container-type: normal;\n}',
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
          text: 'Container Names',
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
          text: '/* Named containers for specific targeting */\n.sidebar {\n  container-type: inline-size;\n  container-name: sidebar;\n}\n\n.main-content {\n  container-type: inline-size;\n  container-name: main;\n}\n\n/* Target specific containers */\n@container sidebar (max-width: 300px) {\n  .card {\n    font-size: 0.875rem;\n  }\n}\n\n@container main (min-width: 600px) {\n  .card {\n    font-size: 1.125rem;\n  }\n}',
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
          text: 'Real-World Example',
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
          text: '<!-- Product card that adapts to its container -->\n<div class="product-grid">\n  <div class="product-card-container">\n    <article class="product-card">\n      <img src="product.jpg" alt="Product" />\n      <div class="product-info">\n        <h3>Product Name</h3>\n        <p>Description...</p>\n        <button>Buy Now</button>\n      </div>\n    </article>\n  </div>\n</div>\n\n<div class="product-sidebar">\n  <div class="product-card-container">\n    <article class="product-card">\n      <!-- Same card, different layout -->\n    </article>\n  </div>\n</div>',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'css',
      },
      content: [
        {
          text: '/* Container setup */\n.product-card-container {\n  container-type: inline-size;\n  container-name: product;\n}\n\n/* Base card styles */\n.product-card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n}\n\n.product-card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  border-radius: 0.25rem;\n}\n\n/* Wide container - horizontal layout */\n@container product (min-width: 400px) {\n  .product-card {\n    flex-direction: row;\n  }\n  \n  .product-card img {\n    width: 150px;\n    height: 150px;\n  }\n}\n\n/* Very wide container - larger text */\n@container product (min-width: 600px) {\n  .product-card h3 {\n    font-size: 1.25rem;\n  }\n  \n  .product-card p {\n    font-size: 1rem;\n  }\n}',
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
          text: 'Grid Layouts',
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
          text: '/* Responsive grid with container queries */\n.grid-container {\n  container-type: inline-size;\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n\n.grid-item {\n  container-type: inline-size;\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n}\n\n/* Single column in narrow containers */\n@container (max-width: 300px) {\n  .grid-item {\n    display: block;\n  }\n}\n\n/* Two columns in medium containers */\n@container (min-width: 300px) and (max-width: 600px) {\n  .grid-item {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.5rem;\n  }\n}\n\n/* Full layout in wide containers */\n@container (min-width: 600px) {\n  .grid-item {\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n    gap: 1rem;\n  }\n}',
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
          text: 'Typography Scaling',
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
          text: '/* Fluid typography with container queries */\n.text-container {\n  container-type: inline-size;\n}\n\n.text-content h1 {\n  font-size: 1.5rem;\n  line-height: 1.2;\n}\n\n.text-content p {\n  font-size: 1rem;\n  line-height: 1.5;\n}\n\n/* Scale up in wider containers */\n@container (min-width: 400px) {\n  .text-content h1 {\n    font-size: 2rem;\n  }\n  \n  .text-content p {\n    font-size: 1.125rem;\n  }\n}\n\n@container (min-width: 800px) {\n  .text-content h1 {\n    font-size: 2.5rem;\n  }\n  \n  .text-content p {\n    font-size: 1.25rem;\n  }\n}',
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
          text: 'Component Libraries',
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
          text: '/* Reusable button component */\n.button-container {\n  container-type: inline-size;\n}\n\n.btn {\n  padding: 0.5rem 1rem;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n  border: none;\n  cursor: pointer;\n}\n\n/* Compact in narrow containers */\n@container (max-width: 200px) {\n  .btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n}\n\n/* Full size in wide containers */\n@container (min-width: 200px) {\n  .btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1rem;\n  }\n}\n\n/* Large in very wide containers */\n@container (min-width: 400px) {\n  .btn {\n    padding: 1rem 2rem;\n    font-size: 1.125rem;\n  }\n}',
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
          text: 'Supported in Chrome 105+, Firefox 110+, and Safari 16+. For older browsers, provide fallbacks:',
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
          text: '/* Fallback for older browsers */\n.card {\n  display: flex;\n  flex-direction: column;\n  /* Default mobile layout */\n}\n\n/* Container query for modern browsers */\n@container (min-width: 400px) {\n  .card {\n    flex-direction: row;\n  }\n}\n\n/* Media query fallback for older browsers */\n@media (min-width: 768px) {\n  .card {\n    flex-direction: row;\n  }\n}\n\n/* Or use @supports */\n@supports (container-type: inline-size) {\n  .card {\n    /* Container query styles */\n  }\n}',
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
          text: 'Performance Tips',
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
                  text: 'Use ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'inline-size',
                  type: 'text',
                },
                {
                  text: ' instead of ',
                  type: 'text',
                },
                {
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: 'size',
                  type: 'text',
                },
                {
                  text: ' when possible',
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
                  text: 'Avoid deeply nested container queries',
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
                  text: 'Use named containers for complex layouts',
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
                  text: 'Combine with CSS Grid and Flexbox',
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
                  text: 'Test on different container sizes',
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
                  text: 'Consider fallbacks for older browsers',
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
                  text: 'Reusable component libraries',
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
                  text: 'Card layouts and product grids',
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
                  text: 'Sidebar and main content areas',
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
                  text: 'Responsive typography',
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
                  text: 'Dashboard widgets',
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
                  text: 'Any component that needs to adapt to its container',
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
                  text: 'Design systems requiring flexible components',
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
          text: 'Container queries finally make components truly responsive to their context, not just the viewport. A game-changer for modern web development.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedCssContainerQueriesArticle = async (tx: PrismaClient) => {
  const createdAt = new Date('2025-05-15T21:00:00.000Z');
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
        'Learn how CSS Container Queries enable truly responsive components that adapt to their container size, not just the viewport.',
      seoKeywords:
        'css container queries, responsive design, component design, css layout, modern css, responsive components, container-type, @container',
      seoTitle: 'CSS Container Queries - Responsive Components',
      shortDescription: 'How to create components that adapt to their container size using CSS Container Queries.',
      slug: 'css-container-queries',
      title: 'CSS Container Queries',
      type: 'shard',
    },
  });
};
