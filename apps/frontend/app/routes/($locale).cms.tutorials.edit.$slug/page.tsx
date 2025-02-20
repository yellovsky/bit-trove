// common modules
import type { CMSTutorial } from '@repo/api-models';
import { useLocale } from '@repo/remix-i18n';
import { type FC, useCallback } from 'react';

// common modules
import { LoadingScreen } from '~/components/screens/loading';
import { NotFoundScreen } from '~/components/screens/not-found';
import { UpsertTutorialForm } from '~/components/forms/upsert-tutorial';
import { useCMSTutorialQuery, useUpdateTutorialMutation } from '~/api/tutorial';

// local moduules
import { page as pageCn } from './page.module.scss';

interface CMSEditTutorialPageProps {
  slug: string;
}

export const CMSEditTutorialPage: FC<CMSEditTutorialPageProps> = ({ slug }) => {
  const locale = useLocale();
  const cmsTutorialQuery = useCMSTutorialQuery({ locale, slug });

  const updateMutation = useUpdateTutorialMutation({});
  const handleSubmit = useCallback(
    (data: CMSTutorial) => updateMutation.mutateAsync({ ...data, slug }),
    [slug, updateMutation.mutateAsync],
  );

  return !cmsTutorialQuery.isFetched ? (
    <LoadingScreen />
  ) : !cmsTutorialQuery.data?.data ? (
    <NotFoundScreen />
  ) : (
    <div className={pageCn}>
      <UpsertTutorialForm defaultValues={cmsTutorialQuery.data.data} onSubmit={handleSubmit} />
    </div>
  );
};
