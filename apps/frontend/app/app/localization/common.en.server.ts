export default {
  '{{year}} all rights reserved': '© {year}. All rights reserved.',
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

  error_page: {
    '404': {
      button_text: 'Go back to the homepage.',
      subtitle:
        'The page you’re looking for doesn’t exist. It might have been removed, renamed, or the URL might be incorrect. If you believe this is a mistake, please reach out to support.',
      title: 'There’s nothing here.',
    },

    '500': {
      button_text: 'Return to the homepage.',
      subtitle:
        'An unexpected error occurred while processing your request. Please try again later. If the problem persists, contact support.',
      title: 'Something went wrong on our end.',
    },
  },
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
};
