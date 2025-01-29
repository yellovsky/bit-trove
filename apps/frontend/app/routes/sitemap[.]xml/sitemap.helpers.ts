const TODAY = new Date().toISOString();
const HOSTNAME = 'https://test.com';
const CHANGEFREQ = 'weekly';
const PRIORITY = '0.7';

const constructURL = (pathname: string) => `${HOSTNAME}${pathname}`;

interface generateURLTagParams {
  pathname: string;
  locale: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  alternameLangs?: Array<{ hreflang: string; pathname: string }>;
}

export const generateURLTag = (params: generateURLTagParams) => {
  const locTag = `<loc>${constructURL(params.pathname)}</loc>`;
  const lastmodTag = `<lastmod>${params.lastmod || TODAY}</lastmod>`;
  const changefreqTag = `<changefreq>${params.changefreq || CHANGEFREQ}</changefreq>`;
  const priorityTag = `<priority>${params.priority || PRIORITY}</priority>`;
  const alternameLangsTag = params.alternameLangs?.map(
    al => `
    <xhtml:link
      rel="alternate"
      hreflang="${al.hreflang}"
      href="${constructURL(al.pathname)}"
    />
  `,
  );

  const content = [locTag, lastmodTag, changefreqTag, priorityTag, alternameLangsTag]
    .filter(Boolean)
    .join('\n');

  return `<url>${content}</url>`;
};
