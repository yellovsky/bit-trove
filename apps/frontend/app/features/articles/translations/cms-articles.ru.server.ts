export default {
  articles_table: {
    created_at: {
      column_header: 'Создано',
    },
    language_code: {
      column_header: 'Язык',
    },
    published: {
      column_header: 'Опубликовано',
    },
    slug: {
      column_header: 'Slug',
    },
    title: {
      column_header: 'Заголовок',
    },
  },
  upsert_article_form: {
    content_control: {
      description: 'Содержание статьи',
      label: 'Содержание',
    },
    language_code_control: {
      aria_label: 'Выберите язык статьи',
      description: 'Язык статьи',
      label: 'Язык',
      placeholder: 'Выберите язык статьи',
    },
    published_control: {
      description: 'Опубликована ли статья',
      label: 'Опубликована',
    },
    related_articles_section: {
      add_button: 'Добавить связанную статью',
      article_title: 'Статья:',
      article_type: 'Тип:',
      legend: 'Связанные статьи',
      no_related_articles: 'Связанные статьи не найдены',
      placeholder: 'Выберите статью',
      relation_types: {
        furtherReading: 'Читать дальше',
        related: 'Связанные',
      },
    },
    seo_description_control: {
      aria_label: 'Введите SEO описание статьи',
      description: 'SEO описание статьи',
      label: 'SEO описание',
      placeholder: 'Введите SEO описание статьи',
    },
    seo_fieldset_title: 'SEO',
    seo_keywords_control: {
      aria_label: 'Введите SEO ключевые слова статьи',
      description: 'SEO ключевые слова статьи',
      label: 'SEO ключевые слова',
      placeholder: 'Введите SEO ключевые слова статьи',
    },
    seo_title_control: {
      aria_label: 'Введите SEO заголовок статьи',
      description: 'SEO заголовок статьи',
      label: 'SEO заголовок',
      placeholder: 'Введите SEO заголовок статьи',
    },
    short_description_control: {
      aria_label: 'Введите краткое описание статьи',
      description: 'Краткое описание статьи',
      label: 'Краткое описание',
      placeholder: 'Введите краткое описание статьи',
    },
    slug_control: {
      aria_label: 'Введите slug статьи',
      description: 'Slug статьи',
      label: 'Slug',
      placeholder: 'Введите slug статьи',
      validation: {
        slug_is_already_taken: 'Slug уже занят',
        slug_is_not_available: 'Slug недоступен',
      },
    },
    submit_button: {
      create: 'Создать статью',
      update: 'Обновить статью',
    },
    tags_control: {
      description: 'Теги статьи',
      label: 'Теги',
      placeholder: 'Введите теги статьи',
    },
    title_control: {
      aria_label: 'Введите заголовок статьи',
      description: 'Заголовок статьи',
      label: 'Заголовок',
      placeholder: 'Введите заголовок статьи',
    },
  },
};
