// local modules
import { useCallback, type FC } from 'react';
import { index as indexCn, page as pageCn } from './route.module.scss';
import type { GuideItem } from '@repo/api-models';
import { Heading } from '../../components/heading';
import { useLocale } from '@repo/remix-i18n';
import { LanguageMismatchInfo } from '../../components/language-mismatch-info';
import { AnyBlock } from '../../components/blocks/any-block';
import { BlocksIndex } from '../../components/blocks-index';

const gudeItem: GuideItem = {
  blocks: [
    {
      content: {
        md: `
Локализация — это не просто перевод текста, а адаптация интерфейса под разные языки и регионы. Она включает в себя не только текст, но и форматы дат, валют, чисел и даже специфические UI-элементы.

Хорошая локализация улучшает UX — пользователи чувствуют себя комфортнее, когда интерфейс говорит с ними на привычном языке. Кроме того, она повышает доступность (accessibility), помогая людям с разным уровнем владения языком воспринимать информацию.

В этом гайде разберем, как локализовать Remix-приложение с помощью [remix-i18next](https://github.com/sergiodxa/remix-i18next).
`,
      },

      order: 0,
      subtitle: null,
      title: null,
      type: 'text',
    },

    {
      content: {
        md: `
Для локализации будем использовать [remix-i18next](https://github.com/sergiodxa/remix-i18next). Основные принципы работы с переводами:

*	Переводы хранятся в JSON-файлах, разделенных по языкам.
*	**Ключ** — идентификатор фразы, **значение** — перевод на конкретном языке.
*	Переводы могут быть разбиты по _namespace_ — например, _common.json_ для общих фраз, _account.json_ для кабинета пользователя и т. д.
*	Сервер определяет локаль пользователя из заголовков запроса или URL.
*	Клиент синхронизирует локаль с сервером и загружает нужные файлы с переводами.
`,
      },
      order: 0,
      subtitle: null,
      title: 'Установка и структура переводов',
      type: 'text',
    },
    {
      content: { variants: [{ language: 'sh', text: 'npm i remix-i18next' }] },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    {
      content: { md: 'Пример структуры файлов:' },
      order: 0,
      subtitle: 'Создание файлов переводов',
      title: null,
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'json',
            text: `// public/locales/en/common.json
{
  "WELCOME_MSG": "Hello!",
  "BYE_MSG": "Bye :("
}

// public/locales/fr/common.json
{
  "WELCOME_MSG": "Bienvenu!",
  "BYE_MSG": "Au revoir :("
}`,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    {
      content: {
        md: 'Теперь _common.json_ содержит переводы для двух языков.',
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'text',
    },

    {
      content: {
        md: `
Если приложение большое, полезно разделять переводы по областям.

Например:
-	_common.json_ → общие фразы, кнопки, навигация.
-	_account.json_ → личный кабинет пользователя.
-	_subscriptions.json_ → страницы подписок.

Это позволяет загружать только нужные переводы, а не весь объем сразу.

Но стоит быть внимательным: если кнопка «Отмена» есть и в _account.json_, и в _subscriptions.json_, лучше вынести её в _common.json_, чтобы избежать лишних загрузок.
        `,
      },
      order: 0,
      subtitle: 'Разделение переводов на namespace',
      title: null,
      type: 'text',
    },

    {
      content: { md: `Создадим конфигурационный файл _config/i18n.ts_:` },
      order: 0,
      subtitle: null,
      title: 'Настройка сервера',
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'ts',
            text: `export default {
  defaultNS: 'common',
  fallbackLng: 'en',
  react: { useSuspense: true },
  supportedLngs: ['en', 'fr'],
};
        `,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    {
      content: {
        md: `Что здесь указано:
- \`defaultNS\` — какой namespace использовать по умолчанию.
- \`fallbackLng\` — язык, который использовать, если перевода нет.
- \`react.useSuspense\` — если \`true\`, загрузка переводов будет проходить через \`Suspense\`.
- \`supportedLngs\` — список поддерживаемых языков.

По умолчанию переводы берутся из _/public/locales/{locale}/{namespace}.json_.
`,
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'text',
    },

    {
      content: {
        md: `Если используем TypeScript, добавим _public/locales/i18next.d.ts_:`,
      },
      order: 0,
      subtitle: null,
      title: 'Типизация переводов в TypeScript',
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import 'i18next';

import type commonNs from './en/common.json';
import type accountNs from './en/account.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonNs;
      account: typeof accountNs;
    };
  }
}`,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    {
      content: {
        md: `Теперь TypeScript будет проверять правильность ключей при использовании переводов.`,
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'text',
    },

    {
      content: {
        md: `Создадим _i18n.server.ts_:`,
      },
      order: 0,
      subtitle: null,
      title: 'Определение локали на сервере',
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';
import { RemixI18Next } from 'remix-i18next';
import i18n from '~/config/i18n';

export const i18nServer = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,
    supportedLanguages: i18n.supportedLngs,
  },
  i18next: { ...i18n, backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') } },
  plugins: [Backend],
});`,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    {
      content: {
        md: `Теперь сервер может загружать переводы из файлов.`,
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'text',
    },

    {
      content: {
        md: ``,
      },
      order: 0,
      subtitle: null,
      title: 'Инициализация I18nextProvider',
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import { i18nServer } from '~/i18n.server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const instance = createInstance();
  const locale = getRequestLocale(request);

  await instance
    .use(initReactI18next)
    .use(FsBackend)
    .init({
      ...i18n,
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
      lng: locale,
      ns: i18nServer.getRouteNamespaces(remixContext),
    });

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
      /* ... */
      },
    );
  });
}`,
          },
        ],
      },
      order: 0,
      subtitle: 'На сервере (<i>entry.server.tsx</i>)',
      title: null,
      type: 'code',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { getInitialNamespaces } from 'remix-i18next';

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18n,
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      detection: { order: ['htmlTag'] },
      ns: getInitialNamespaces(),
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
    );
  });
}`,
          },
        ],
      },
      order: 0,
      subtitle: 'На клиенте (<i>entry.client.tsx</i>)',
      title: null,
      type: 'code',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import { useTranslation } from "react-i18next";

const Component = () => {
  const { t } = useTranslation();

  return <div>{t('WELCOME_MSG')}</div>;
};`,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: 'Переводы в компонентах',
      type: 'code',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `t('GREET_USER', { name: 'Alex' }); // "Hello Alex"`,
          },
        ],
      },
      order: 0,
      subtitle: 'Для перевода с переменными',
      title: null,
      type: 'code',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `import IntlMessageFormat from "@formatjs/intl-messageformat";

const rawMessage = t('DURATION_MSG');
const formatter = new IntlMessageFormat(rawMessage, i18n.language);

formatter.format({ durationValue: 2, durationUnit: 'minutes' });`,
          },
        ],
      },
      order: 0,
      subtitle: 'Для сложных фраз с ICU',
      title: null,
      type: 'code',
    },

    {
      content: {
        md: 'Меняем язык, просто обновляя URL:',
      },
      order: 0,
      subtitle: null,
      title: 'Смена языка',
      type: 'text',
    },

    {
      content: {
        variants: [
          {
            language: 'tsx',
            text: `<button onClick={() => navigate('/fr')}>Switch to French</button>`,
          },
        ],
      },
      order: 0,
      subtitle: null,
      title: null,
      type: 'code',
    },

    //     {
    //       content: {
    //         md: `Remix - SSR-based фреймворк, потому определение локали пользователя на стороне сервера является первостепенным. Для синхронизации, определённая на сервере локаль должна быть передана на клиент.

    // Для начала создадим файл \`i18n.server.ts\`, где укажем:`,
    //       },
    //       order: 0,
    //       subtitle: 'Инициализация <code>I18nextProvider</code> на сервере',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'tsx',
    //             text: `import Backend from 'i18next-fs-backend';
    // import { resolve } from 'node:path';
    // import { RemixI18Next } from 'remix-i18next';
    // import i18n from '~/config/i18n';

    // export const i18nServer = new RemixI18Next({
    //   detection: {
    //     fallbackLanguage: i18n.fallbackLng,
    //     supportedLanguages: i18n.supportedLngs,
    //   },
    //   i18next: { ...i18n, backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') } },
    //   plugins: [Backend],
    // });
    // `,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `Тут мы укажем параметры для определения локали и получения файлов переводов. Плагин Backend необходим, что бы работала функция переводов getFixedT на сервере.

    // Далее, добавим код в \`entry.server.tsx\`:
    //         `,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'tsx',
    //             text: `import { i18nServer } from '~/i18n.server';

    // export default async function handleRequest(
    //   request: Request,
    //   responseStatusCode: number,
    //   responseHeaders: Headers,
    //   remixContext: EntryContext,
    // ) {
    //   const instance = createInstance();
    //   const locale = getRequestLocale(request);

    //   await instance
    //     .use(initReactI18next)
    //     .use(FsBackend)
    //     .init<FsBackendOptions>({
    //       ...i18n,
    //       backend: {
    //         loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    //       },
    //       lng: locale,
    //       ns: i18nServer.getRouteNamespaces(remixContext),
    //     });

    //   return new Promise((resolve, reject) => {
    //     const { pipe } = renderToPipeableStream(
    //       <I18nextProvider i18n={instance}>
    //         <RemixServer context={remixContext} url={request.url} />
    //       </I18nextProvider>,
    //       {
    //       /* ... */
    //       },
    //     );
    //   });
    // }
    // `,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: 'Код инициализации на клиенте почти не отличается от серверного, за исключением правил определения локали и уже загруженных файлов с переводами (на сервере они считаются загруженными по умолчанию). В файле `entry.client.tsx`:',
    //       },
    //       order: 0,
    //       subtitle: 'Инициализация <code>I18nextProvider</code> на клиенте',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'tsx',
    //             text: `import i18next from 'i18next';
    // import LanguageDetector from 'i18next-browser-languagedetector';
    // import Backend from 'i18next-http-backend';
    // import { getInitialNamespaces } from 'remix-i18next';

    // async function hydrate() {
    //   await i18next
    //     .use(initReactI18next)
    //     .use(LanguageDetector)
    //     .use(Backend)
    //     .init({
    //       ...i18n,
    //       backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    //       detection: { order: ['htmlTag'] },
    //       ns: getInitialNamespaces(),
    //     });

    //   startTransition(() => {
    //     hydrateRoot(
    //       document,
    //       <I18nextProvider i18n={i18next}>
    //         <RemixBrowser />
    //       </I18nextProvider>,
    //     );
    //   });
    // }`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `Тут мы указали откуда брать файлы для переводов, уже загруженные переводы (\`getInitialNamespaces\`) и правила определения локали. В данном конкретном случае локаль определяется из URL: принимаем, что локаль в адресе всегда есть, это гарантирует сервер - он сделает редирект, если локаль не указана, или указана не валидная.`,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         md: `Перевести текст можно двумя способами. В основном, для переводов используют хук \`useTranslation\`. Т.к. это хук - его использование возможно только в компонентах. Для переводов на сервере, например, что бы перевести meta title или description страницы внутри loader используется \`i18nServer.getFixedT\`.`,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: 'Перевод',
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         html: `\`useTranslation\` будет загружать файлы с переводами, если они ещё не были загружены. Потому помимо самой функции перевода \`f\` доступен флаг \`ready\`, индицирующий готовность этих файлов. Этот флаг имеет смысл в том случае, если флаг useSuspense не задан. Этот флаг можно задать или как дефолтный или вторым аргументом в параметрах useTranslation в каждом конкретном случае. Что бы не проверять флаг ready каждый раз, возможно, этот флаг стоит указать по умолчанию.

    // Что бы предзагрузить файлы с переводами, нужно перечислить их в root.tsx или в конкретном роуте как \`export const handle = { i18n: ['common', 'account'] }; \`. Теперь для этого и дочерних роутов переводы из common и account будут доступны, и флаг ready будет всегда true.
    //         `,
    //       },
    //       order: 0,
    //       subtitle: '<code>useTranslation</code>',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'tsx',
    //             text: `const Component: FC = () => {
    //   const { t, ready } = useTranslation('account');

    //   return !ready
    //     ? <div>Loading...</div>
    //     : <div>{ t('ACCOUNT_PAGE_TITLE') }</div>;
    // };`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         html: `Для переводов на сервере используется i18nServer.getFixedT. Эта функция не привязана к контексту, и для работы она требует объект запроса. Локаль определится из объекта request по тем же правилам, что указаны в entry.server.tsx. Есть возможность явно указать локаль, не привязываясь к локали из запроса.`,
    //       },
    //       order: 0,
    //       subtitle: '<code>i18nServer.getFixedT</code>',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'ts',
    //             text: `export const loader = async (loaderArgs: LoaderFunctionArgs) => {
    //   const t = await i18nServer.getFixedT(loaderArgs.request, 'account');
    //   const title = t('ACCOUNT_PAGE_TITLE');

    //   return json<LoaderData>({ title });
    // };`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `remix-i18next поддерживает передачу переменных для переводов. Так, например, для ключа \`"Greet {{name}}": "Hello {{name}}"\` можно передать переменную name:`,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: 'Перевод с переменными',
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'ts',
    //             text: `t('Greet {{name}}', { name: 'Greg' })); // Hello Greg`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `К сожалению, возможности переводов remix-i18next ограничены подстановкой. Для интернационализации приходися использовать другие инструменты.`,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         md: `Для интернационализации даты и времени можно использовать Intl и передать интернационализированную строку в качестве аргумента в remix-i18next:`,
    //       },
    //       order: 0,
    //       subtitle: 'Интернационализация даты/времени',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'ts',
    //             text: `const locale = 'en'; // or get it from somewhere else
    // const date = new Date();

    // const dateFormatter = new Intl.DateTimeFormat(locale, {
    //   month: 'long',
    //   year: 'numeric',
    // });

    // const formattedDate = dateFormatter.format(date);

    // // assume the key "Today is: {{date}}" exists
    // const msg = t('Today is: {{date}}', { date: formattedDate });`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `Для более сложных переводов может подойти формат ICU. Это очень мощный формат переводов, он позволяет интернационализировать даты и числительные. Он даже может подставлять различные переводы в зависимости от значения переменной, что может быть удобно для переводов типа: "через 2 минуты" или "через 4 часа". remix-i18next поддерживает только подстановку текстовых значений, потому в качестве ключей должны хнраниться ICU-шаблоны для переводов.`,
    //       },
    //       order: 0,
    //       subtitle: 'Формат ICU',
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'json',
    //             text: `// public/en/common.json
    // {
    //   "{durationUnit} {durationValue} before start": "до начала {durationUnit, select, minutes {{durationValue, plural, one {# минута} few {# минуты} other {# минут}}} hours {{durationValue, plural, one {# час} few {# часа} other {# часов}}} days {{durationValue, plural, one {# день} few {# дня} other {# дней}}} months {{durationValue, plural, one {# месяц} few {# месяца} other {# месяцев}}} years {{durationValue, plural, one {# год} few {# года} other {# лет}}} other {{durationUnit}}}"
    // }`,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: `Тогда можно использовать перевод так:`,
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'text',
    //     },

    //     {
    //       content: {
    //         variants: [
    //           {
    //             language: 'js',
    //             text: `import { useTranslation } from "react-i18next";
    // import IntlMessageFormat from "@formatjs/intl-messageformat";

    // const { t, i18n } = useTranslation();
    // const rawMessage = t('{durationUnit} {durationValue} before start');

    // const formatter = new IntlMessageFormat(rawMessage, i18n.language);

    // // до начала 2 минуты
    // formatter.format({ durationUnit: 'minutes', durationValue: 2 });

    // // до начала 12 часов
    // formatter.format({ durationUnit: 'hours', durationValue: 12 });
    // `,
    //           },
    //         ],
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: null,
    //       type: 'code',
    //     },

    //     {
    //       content: {
    //         md: 'В этом подходе локаль в URL является приоритетной, потому для смены языка нужно всего лишь перезагрузить страницу с нужной локалью в адресе. Перезагрузка страницы необходима, т.к. часть переводов загружается на сервере и передаётся строкой на клиент (например, title или description страницы). Что бы обновить эти переводы, нужно пройти процесс с начала. Текущий язык как правило так же используется для запросов на АПИ, и эти данные так же необходимо обновить, потому перезагрузка страницы для смены языка зачастую является оптимальным решением.',
    //       },
    //       order: 0,
    //       subtitle: null,
    //       title: 'Смена языка',
    //       type: 'text',
    //     },
  ],

  created_at: new Date().toISOString(),
  id: '123',
  language_code: 'en',
  language_codes: ['en'],
  original_language_code: 'en',
  published_at: new Date().toISOString(),
  seo_description: 'sd',
  seo_keywords: 'sk',
  seo_title: 'st',
  short_description: 'sd',
  slug: 'slug',
  title: 'Как локализовать приложение на Remix',
};
subtitle: null;

export const GuidePage: FC = () => {
  const locale = useLocale();
  const getLink = useCallback((l: string) => `/${l}/guides/${gudeItem.slug}`, [gudeItem]);

  const index = gudeItem.blocks.filter(block => !!(block.title || block.subtitle));
  console.log('index', index);

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {gudeItem.title}
      </Heading>

      <BlocksIndex blocks={gudeItem.blocks} className={indexCn} />

      {!gudeItem.language_codes.includes(locale) && (
        <LanguageMismatchInfo availableLangCodes={gudeItem.language_codes} getLink={getLink} />
      )}

      {gudeItem.blocks.map((block, index) => (
        <AnyBlock block={block} key={`${block.type}_${index}`} />
      ))}
    </div>
  );
};
