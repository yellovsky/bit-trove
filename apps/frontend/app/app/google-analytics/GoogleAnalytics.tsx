import type { FC } from 'react';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/
const GOOGLE_ANALYTICS_NAME = 'GoogleAnalytics';
const GA_ID = 'G-6J323B94GS';

const gaScript = `
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', '${GA_ID}');
`;

const GoogleAnalytics: FC = () => (
  <>
    {/* Google tag (gtag.js) */}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
    {/** biome-ignore lint/security/noDangerouslySetInnerHtml: google analytics script */}
    <script dangerouslySetInnerHTML={{ __html: gaScript }} />
  </>
);

GoogleAnalytics.displayName = GOOGLE_ANALYTICS_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { GoogleAnalytics };
