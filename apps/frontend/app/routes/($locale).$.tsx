// global modules
import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';

// common modules
import { i18nServer } from '~/modules/i18n.server';
import { makePageMetaTitle } from '~/utils/seo';
import { NotFoundScreen } from '~/components/screens/not-found';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18nServer.getFixedT(request);
  const title = makePageMetaTitle(t('Page Not Found'));
  return json({ title }, { status: 404 });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export default function NotFound() {
  return <NotFoundScreen />;
}
