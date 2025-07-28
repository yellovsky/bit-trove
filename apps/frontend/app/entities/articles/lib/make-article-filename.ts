export const makeArticleFilename = (title: string, extension = 'md') =>
  [title.replace(/ /g, '-').replace(/-+/g, '-').toLowerCase(), extension].join('.');
