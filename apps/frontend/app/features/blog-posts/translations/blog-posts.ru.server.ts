export default {
  'Blog post not found': 'Статья не найдена',
  blog_posts_meta_description:
    'Подробные статьи, руководства и обзоры по программированию, разработке и технологиям. Глубокий контент о React, TypeScript, архитектуре и многом другом.',
  blog_posts_meta_keywords:
    'статьи о программировании, руководства по разработке, React гайды, TypeScript советы, архитектура ПО, веб-разработка, учебники по кодингу, технические статьи',
  blog_posts_meta_title: 'Статьи – Подробные руководства и статьи о программировании',
  'Create blog post failed': 'Не удалось создать статью',
  'Create blog post success': 'Статья успешно создана',
  create_blog_post_button: {
    text: 'Создать статью',
  },
  'Edit blog post': 'Редактировать статью',
  'Error loading blog post': 'Ошибка загрузки статьи',

  empty: {
    description: 'Загляните позже для новых статей и руководств.',
    title: 'Статей пока нет',
  },
  'Failed to load blog posts': 'Не удалось загрузить статьи',
  'Loading blog post': 'Загрузка статьи...',
  loading: {
    end_of_content: 'Вы достигли конца',
    more_posts: 'Загрузка дополнительных статей...',
    no_more_posts: 'Тут больше ничего нет',
  },
  'No blog posts found': 'Статьи не найдены',
  network_error: {
    description: 'Не удалось загрузить статьи. Проверьте подключение к интернету и попробуйте снова.',
    title: 'Ошибка сети',
    try_again: 'Попробовать снова',
  },
  'Publish blog post failed': 'Не удалось опубликовать статью',
  'Publish blog post success': 'Статья успешно опубликована',
  sort: {
    label: 'Сортировать по',
    newest_first: 'Сначала новые',
    oldest_first: 'Сначала старые',
    oldest_published: 'Старые публикации',
    recently_published: 'Недавно опубликованные',
    title_az: 'Заголовок А-Я',
    title_za: 'Заголовок Я-А',
  },
  'Unpublish blog post failed': 'Не удалось снять с публикации статью',
  'Unpublish blog post success': 'Статья успешно снята с публикации',
  'Update blog post failed': 'Не удалось обновить статью',
  'Update blog post success': 'Статья успешно обновлена',
  upsert_blog_post_form: {
    content: {
      aria_label: 'Содержание',
      description: 'Это содержимое будет показано на странице статьи',
      label: 'Содержание',
      placeholder: 'Содержание статьи',
    },
    language_code: {
      aria_label: 'Язык',
      description: 'Этот язык будет использоваться для генерации URL статьи',
      label: 'Язык',
      placeholder: 'Язык статьи',
    },
    published: {
      aria_label: 'Опубликовано',
      description: 'Эта статья будет опубликована',
      label: 'Опубликовано',
    },
    seo_description: {
      aria_label: 'SEO описание',
      description: 'Это описание будет использоваться в SEO статьи',
      label: 'SEO описание',
      placeholder: 'SEO описание статьи',
    },
    seo_keywords: {
      aria_label: 'SEO ключевые слова',
      description: 'Эти ключевые слова будут использоваться в SEO статьи',
      label: 'SEO ключевые слова',
      placeholder: 'SEO ключевые слова статьи',
    },
    seo_title: {
      aria_label: 'SEO заголовок',
      description: 'Этот заголовок будет использоваться в SEO статьи',
      label: 'SEO заголовок',
      placeholder: 'SEO заголовок статьи',
    },
    short_description: {
      aria_label: 'Краткое описание',
      description: 'Это краткое описание будет показано в списке статей',
      label: 'Краткое описание',
      placeholder: 'Краткое описание статьи',
    },
    slug: {
      aria_label: 'Slug статьи',
      description: 'Этот slug будет использоваться для генерации URL статьи',
      label: 'Slug',
      placeholder: 'Slug статьи',
    },
    title: {
      aria_label: 'Заголовок статьи',
      description: 'Этот заголовок будет показан в списке статей и на странице статьи',
      label: 'Заголовок',
      placeholder: 'Заголовок статьи',
    },
  },
} as const;
