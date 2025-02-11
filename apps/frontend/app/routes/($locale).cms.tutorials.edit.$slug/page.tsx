// common modules
import type { FC } from 'react';
import { useLocale } from '@repo/remix-i18n';

// common modules
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

  return !cmsTutorialQuery.isFetched ? null : (
    <div className={pageCn}>
      <UpsertTutorialForm
        defaultValues={cmsTutorialQuery.data?.data}
        onSubmit={updateMutation.mutateAsync}
      />
    </div>
  );
};
