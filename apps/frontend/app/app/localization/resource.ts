import { isLocale, type Locale, SUPPORTED_LOCALES } from '@shared/config';
import { CMS_NS } from '@shared/config/translations';
import { cmsEn, cmsRu } from '@shared/translations/cms';

import { ARTICLES_NS, CMS_ARTICLES_NS } from '@features/articles';
import { articlesEn, articlesRu, cmsArticlesEn, cmsArticlesRu } from '@features/articles/translations';
import { AUTH_NS } from '@features/auth';
import { authEn, authRu } from '@features/auth/translations';
import { BLOG_POSTS_NS } from '@features/blog-posts';
import { blogPostsEn, blogPostsRu } from '@features/blog-posts/translations';
import { SHARDS_NS } from '@features/shards';
import { shardsEn, shardsRu } from '@features/shards/translations';

import commonEn from './common.en.server';
import commonRu from './common.ru.server';

export type Namespace = keyof Resource;
const isNamespace = (ns: string): ns is Namespace => ns in resources[SUPPORTED_LOCALES[0]];

type ResourceShape<TResource> = {
  [K in keyof TResource]: TResource[K] extends string ? string : ResourceShape<TResource[K]>;
};

export const COMMON_NS = 'common';

type Resource = {
  [COMMON_NS]: typeof commonEn;
  [BLOG_POSTS_NS]: ResourceShape<typeof blogPostsEn>;
  [AUTH_NS]: ResourceShape<typeof authEn>;
  [SHARDS_NS]: ResourceShape<typeof shardsEn>;
  [CMS_NS]: ResourceShape<typeof cmsEn>;
  [ARTICLES_NS]: ResourceShape<typeof articlesEn>;
  [CMS_ARTICLES_NS]: ResourceShape<typeof cmsArticlesEn>;
};

export const resources: Record<Locale, Resource> = {
  en: {
    [COMMON_NS]: commonEn,
    [BLOG_POSTS_NS]: blogPostsEn,
    [AUTH_NS]: authEn,
    [SHARDS_NS]: shardsEn,
    [CMS_NS]: cmsEn,
    [ARTICLES_NS]: articlesEn,
    [CMS_ARTICLES_NS]: cmsArticlesEn,
  },
  ru: {
    [COMMON_NS]: commonRu,
    [BLOG_POSTS_NS]: blogPostsRu,
    [AUTH_NS]: authRu,
    [SHARDS_NS]: shardsRu,
    [CMS_NS]: cmsRu,
    [ARTICLES_NS]: articlesRu,
    [CMS_ARTICLES_NS]: cmsArticlesRu,
  },
};

export const getLocalesResource = async (lng: string, ns: string): Promise<object | null> =>
  !isLocale(lng) || !isNamespace(ns) ? null : resources[lng][ns];

type CurlyBracesResources<T> = {
  [K in keyof T]: T[K] extends string ? K : CurlyBracesResources<T[K]>;
};

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'common';
    fallbackNS: 'common';

    // custom resources type
    resources: CurlyBracesResources<Resource>;
  }
}
