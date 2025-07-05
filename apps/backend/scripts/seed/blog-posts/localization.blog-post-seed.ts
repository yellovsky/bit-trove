import type { PrismaClient } from '@generated/prisma';

import { testAccountId } from '../account.seed';

const contentJSON = {
  content: [
    {
      content: [
        {
          text: 'Effect позволяет добавлять обработчики кода после своего исполнения. Это очень похоже на ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'Promise.finally',
          type: 'text',
        },
        {
          text: ', только типизированный.',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          text: 'Так, например, если необходимо сбросить флаг ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'pending',
          type: 'text',
        },
        {
          text: ' по окончании запроса, можно использовать следующий код:',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        language: 'ts',
      },
      content: [
        {
          text: 'const fetchEffect: Effect.Effect<SuccessResponse, FailedResponse> = { /* ... */ };\nconst updatePending = (pending: boolean): void = { /* ... */ };\n\n\nconst requestWithPending: Effect.Effect<SuccessResponse, FailedResponse> = Effect.gen(function*() {\n\tupdatePending(true);\n\t\n\tyield* Effect.addFinalizer(() =>\n\t\tEffect.gen(this, function* () {\n\t\t\tupdatePending(false);\n\t\t\treturn Effect.void;\n\t\t})\n\t);\n\n\treturn yield* fetchEffect;\n}).pipe(Effect.scoped)',
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      content: [
        {
          type: 'hardBreak',
        },
        {
          text: 'Так ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'updatePending(false)',
          type: 'text',
        },
        {
          text: '  будет вызвано, когда ',
          type: 'text',
        },
        {
          marks: [
            {
              type: 'code',
            },
          ],
          text: 'requestWithPending',
          type: 'text',
        },
        {
          text: ' завершит работу',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
  ],
  type: 'doc',
};

export const seedLocalizationBlogPost = async (tx: PrismaClient) => {
  const createdAt = new Date('Fri, 13 Jun 2025 07:46:51 GMT');
  const publishedAt = createdAt;

  const entry = await tx.blogPostEntry.create({
    data: {
      authorId: testAccountId,
      createdAt,
      publishedAt,
    },
  });

  await tx.blogPost.create({
    data: {
      authorId: testAccountId,
      contentJSON,
      createdAt,
      entryId: entry.id,
      languageCode: 'ru',
      publishedAt,
      seoDescription:
        'Узнайте, как добавить локализацию в Remix-приложение с помощью remix-i18next. Подробный гайд по настройке переводов, определению локали, работе с ICU-форматом и смене языка. Улучшите UX и accessibility вашего проекта.',
      seoKeywords:
        'Remix локализация, Remix i18n, remix-i18next, перевод в Remix, ICU формат, i18next Remix, смена языка Remix, интернационализация Remix, локализация приложения, перевод UI Remix',
      seoTitle: 'Как локализовать приложение на Remix',
      shortDescription:
        'Узнайте, как добавить локализацию в Remix-приложение с помощью remix-i18next. Подробный гайд по настройке переводов, определению локали, работе с ICU-форматом и смене языка. Улучшите UX и accessibility вашего проекта.',
      slug: 'how-to-localize-remix-app',
      title: 'Как локализовать приложение на Remix',
    },
  });
};
