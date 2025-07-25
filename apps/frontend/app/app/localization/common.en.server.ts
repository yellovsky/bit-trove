export default {
  '{{number}} min read': '{number, plural, one {# min read} other {# mins read}}',
  '{{year}} all rights reserved': '© {year}. All rights reserved.',
  'Blog Post': 'Blog Post',
  'Content management': 'Content management',
  error: {
    '403': {
      description: "Looks like you can't access this page.",
      text: 'Unauthorized!',
    },
    '404': {
      description: "Oops! The page you're looking for seems to have vanished into thin air.",
      text: 'Page Not found!',
    },
    '500': {
      description: 'Looks like something unexpected happened on the server.',
      text: 'Something went wrong!',
    },
    bad_request: {
      description: "Looks like you've made a mistake in your request.",
      text: 'Bad Request!',
    },
    field_is_required: {
      description: 'This field is required',
      text: 'Field is required',
    },
    forbidden: {
      description: "Looks like you can't access this page.",
      text: 'Unauthorized!',
    },
    invalid_access_token: {
      description: 'Looks like your access token is invalid.',
      text: 'Invalid Access Token!',
    },
    invalid_email: {
      description: 'Invalid email format',
      text: 'Invalid email format',
    },
    not_found: {
      description: "Oops! The page you're looking for seems to have vanished into thin air.",
      text: 'Page Not found!',
    },
    unauthorized: {
      description: "Looks like you can't access this page.",
      text: 'Unauthorized!',
    },
    unknown_error: {
      description: 'Looks like something unexpected happened on the server.',
      text: 'Something went wrong!',
    },
  },
  error_loading_data: 'Error loading data',
  error_page: {
    '404': {
      button_text: 'Go back to the homepage.',
      subtitle:
        'The page you’re looking for doesn’t exist. It might have been removed, renamed, or the URL might be incorrect.',
      title: 'There’s nothing here.',
    },

    '500': {
      button_text: 'Return to the homepage.',
      subtitle: 'An unexpected error occurred while processing your request. Please try again later.',
      title: 'Something went wrong on our end.',
    },
  },
  home_page: {
    description:
      'It’s not a serious project (at least for now), just a place where I share thoughts, ideas, and experiments. Some posts might be useful, others just things I’m curious about. BitTrove is my playground for exploring new concepts, tools, and anything else that sparks interest.',
    title: 'Welcome to BitTrove — my personal programming blog',
  },
  language: {
    all: 'All',
    en: 'English',
    ru: 'Русский',
  },
  language_switcher: {
    all: 'All',
    content_language: 'Content Language',
    help_text: 'No languages selected. All content will be shown.',
    interface_language: 'Interface Language',
    'show content in {{count}} languages':
      'Showing content in {count, plural, one {one language} other {{count} languages}}.',
  },
  loading: 'Loading...',
  menu_items: {
    blog: {
      seoDescription: 'Blog page',
      title: 'Blog',
    },
    cms: {
      title: 'CMS',
    },
    home: {
      seoDescription: 'Home page',
      title: 'Home',
    },
    shards: {
      seoDescription: 'Shards page',
      title: 'Shards',
    },
  },
  meta_general_description:
    'BitTrove is a personal programming blog exploring code, tools, and ideas—from React and MobX to DSLs and architecture. Honest dev notes, no fluff.',
  meta_general_keywords:
    'personal programming blog, JavaScript blog, React blog, MobX tutorials, TypeScript tips, functional programming, software architecture, code experiments, developer notes, frontend engineering, web development blog, effect-ts, RxJS state management, custom editors in React',
  meta_title_suffix: 'BitTrove',
  no_results_found: 'No results found',
  'Related Articles': 'Related Articles',
  'See all': 'See all',
  Shard: 'Shard',
  'Sort by:': 'Sort by:',
  search: {
    empty_message: 'Nothing found. Try a different search term.',
    empty_tip: 'Try searching for different keywords or check your spelling',
    empty_title: 'No results found',
    placeholder: 'Search...',
    prompt_message: 'Type at least 3 characters to search',
    prompt_title: 'Search your content',
    search_close: 'Close',
    search_navigation: 'Navigate',
    search_select: 'Select',
    searching: 'Searching...',
  },
  sort: {
    newest: 'Newest first',
    oldest: 'Oldest first',
  },
  'Table of Contents': 'Table of Contents',
};
