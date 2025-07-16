export default {
  articles_table: {
    created_at: {
      column_header: 'Created at',
    },
    language_code: {
      column_header: 'Language',
    },
    published: {
      column_header: 'Published',
    },
    slug: {
      column_header: 'Slug',
    },
    title: {
      column_header: 'Title',
    },
  },
  upsert_article_form: {
    content_control: {
      description: 'The content of the article',
      label: 'Content',
    },
    language_code_control: {
      aria_label: 'Select the language of the article',
      description: 'The language of the article',
      label: 'Language',
      placeholder: 'Select the language of the article',
    },
    published_control: {
      description: 'Whether the article is published',
      label: 'Published',
    },
    related_articles_section: {
      add_button: 'Add related article',
      article_title: 'Article:',
      article_type: 'Type:',
      legend: 'Related articles',
      no_related_articles: 'No related articles',
      placeholder: 'Select an article',
      relation_types: {
        furtherReading: 'Further reading',
        related: 'Related',
      },
    },
    seo_description_control: {
      aria_label: 'Enter the SEO description of the article',
      description: 'The SEO description of the article',
      label: 'SEO description',
      placeholder: 'Enter the SEO description of the article',
    },
    seo_fieldset_title: 'SEO',
    seo_keywords_control: {
      aria_label: 'Enter the SEO keywords of the article',
      description: 'The SEO keywords of the article',
      label: 'SEO keywords',
      placeholder: 'Enter the SEO keywords of the article',
    },
    seo_title_control: {
      aria_label: 'Enter the SEO title of the article',
      description: 'The SEO title of the article',
      label: 'SEO title',
      placeholder: 'Enter the SEO title of the article',
    },
    short_description_control: {
      aria_label: 'Enter the short description of the article',
      description: 'The short description of the article',
      label: 'Short description',
      placeholder: 'Enter the short description of the article',
    },
    slug_control: {
      aria_label: 'Enter the slug of the article',
      description: 'The slug of the article',
      label: 'Slug',
      placeholder: 'Enter the slug of the article',
      validation: {
        slug_is_already_taken: 'Slug is already taken',
        slug_is_not_available: 'Slug is not available',
      },
    },
    submit_button: {
      create: 'Create article',
      update: 'Update article',
    },
    tags_control: {
      description: 'The tags of the article',
      label: 'Tags',
      placeholder: 'Enter the tags of the article',
    },
    title_control: {
      aria_label: 'Enter the title of the article',
      description: 'The title of the article',
      label: 'Title',
      placeholder: 'Enter the title of the article',
    },
  },
};
