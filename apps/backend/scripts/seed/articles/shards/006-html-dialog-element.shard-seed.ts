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
          text: '<dialog>',
          type: 'text',
        },
        {
          text: ' is a native HTML element that provides built-in modal functionality with accessibility, focus management, and backdrop handling.',
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
          text: 'No more JavaScript libraries for modals - the browser handles everything natively, including screen reader support and keyboard navigation.',
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
                  text: 'Built-in accessibility (ARIA attributes, focus trapping)',
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
                  text: 'Automatic backdrop and click-outside handling',
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
                  text: 'Native browser styling and animations',
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
                  text: 'No JavaScript library dependencies',
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
                  text: 'Consistent behavior across browsers',
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
                  text: 'Lightweight and performant',
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
          text: '<dialog>\n  <h2>Modal Title</h2>\n  <p>This is a native HTML dialog.</p>\n  <button onclick="this.closest(\'dialog\').close()">Close</button>\n</dialog>\n\n<button onclick="document.querySelector(\'dialog\').showModal()">\n  Open Dialog\n</button>',
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
          text: 'Methods',
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
                  text: 'showModal()',
                  type: 'text',
                },
                {
                  text: ' - Opens as modal (with backdrop)',
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
                  text: 'show()',
                  type: 'text',
                },
                {
                  text: ' - Opens without backdrop',
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
                  text: 'close()',
                  type: 'text',
                },
                {
                  text: ' - Closes the dialog',
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
                  text: 'returnValue',
                  type: 'text',
                },
                {
                  text: ' - Gets/sets return value',
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
          text: 'Styling',
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
          text: 'dialog {\n  border: none;\n  border-radius: 8px;\n  padding: 2rem;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n  max-width: 500px;\n  width: 90vw;\n}\n\n/* Backdrop styling */\ndialog::backdrop {\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(4px);\n}\n\n/* Animation */\ndialog[open] {\n  animation: slideIn 0.3s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}',
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
          text: 'Form Integration',
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
          text: "Dialogs work seamlessly with forms - the form's submit button automatically closes the dialog:",
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
          text: '<dialog>\n  <form method="dialog">\n    <h2>Confirm Action</h2>\n    <p>Are you sure you want to proceed?</p>\n    <div>\n      <button value="cancel">Cancel</button>\n      <button value="confirm">Confirm</button>\n    </div>\n  </form>\n</dialog>',
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
          text: 'JavaScript API',
          type: 'text',
        },
      ],
      type: 'heading',
    },
    {
      attrs: {
        'data-enhanced': 'true',
        fileName: null,
        language: 'javascript',
      },
      content: [
        {
          text: "const dialog = document.querySelector('dialog');\n\n// Open modal\ndialog.showModal();\n\n// Handle close events\ndialog.addEventListener('close', (e) => {\n  console.log('Dialog closed with:', dialog.returnValue);\n});\n\n// Handle cancel (Escape key)\ndialog.addEventListener('cancel', (e) => {\n  console.log('Dialog cancelled');\n});\n\n// Close with return value\ndialog.close('user-confirmed');",
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
          text: "import { useRef, useEffect } from 'react';\n\nfunction Modal({ isOpen, onClose, children }) {\n  const dialogRef = useRef<HTMLDialogElement>(null);\n  \n  useEffect(() => {\n    if (isOpen) {\n      dialogRef.current?.showModal();\n    } else {\n      dialogRef.current?.close();\n    }\n  }, [isOpen]);\n  \n  return (\n    <dialog ref={dialogRef} onClose={onClose}>\n      {children}\n    </dialog>\n  );\n}",
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
          text: 'Supported in Chrome 37+, Firefox 98+, and Safari 15.4+. For older browsers, you can use a polyfill or fallback:',
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
          text: "// Simple polyfill for older browsers\nif (!('showModal' in document.createElement('dialog'))) {\n  // Fallback to custom modal implementation\n  class DialogPolyfill {\n    constructor(element) {\n      this.element = element;\n      this.backdrop = null;\n    }\n    \n    showModal() {\n      this.createBackdrop();\n      this.element.style.display = 'block';\n      this.element.setAttribute('aria-modal', 'true');\n    }\n    \n    close() {\n      this.removeBackdrop();\n      this.element.style.display = 'none';\n      this.element.removeAttribute('aria-modal');\n    }\n  }\n  \n  // Apply polyfill to all dialogs\n  document.querySelectorAll('dialog').forEach(dialog => {\n    Object.setPrototypeOf(dialog, DialogPolyfill.prototype);\n  });\n}",
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
                  text: 'Confirmation dialogs',
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
                  text: 'Form modals',
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
                  text: 'Image galleries',
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
                  text: 'Settings panels',
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
                  text: 'Any modal interface that needs accessibility',
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
          text: 'A native HTML element that eliminates the need for modal libraries while providing better accessibility and performance.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedHtmlDialogElementArticle = async (tx: PrismaClient) => {
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
        'Learn how to use the native HTML dialog element for accessible modals with built-in focus management and backdrop handling.',
      seoKeywords: 'html, dialog, modal, accessibility, focus management, backdrop, native browser, web development',
      seoTitle: '<dialog> - Native HTML Modal Element',
      shortDescription: 'How to use the HTML dialog element to create accessible modals without JavaScript libraries.',
      slug: 'html-dialog-element',
      title: '<dialog>',
      type: 'shard',
    },
  });
};
