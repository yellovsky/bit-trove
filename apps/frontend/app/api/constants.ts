export enum QueryNamespace {
  AUTH = 'auth',
  TUTORIAL = 'tutorial',
  BLOG_POST = 'blog_post',
  PERMISSION_POLICY = 'permission_policy',
}

export enum RequestName {
  /**
   * Common
   */
  FETCH_ONE = 'fetch_one',
  FETCH_LIST = 'fetch_list',
  FETCH_LIST_INFINITE = 'fetch_list_infinite',

  FETCH_ONE_CMS = 'fetch_one_cms',
  FETCH_LIST_CMS = 'fetch_list_cms',

  /**
   * Auth
   */
  IS_AUTHORIZED = 'is-authorized',
}
