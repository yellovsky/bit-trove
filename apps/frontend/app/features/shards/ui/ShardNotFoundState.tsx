import { FileQuestion } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

/* -------------------------------------------------------------------------------------------------
 * ShardNotFoundState
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ShardNotFoundState';

const ShardNotFoundState: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <Heading order={2}>{t('menu_items.shards.title')}</Heading>
      <p className="text-center text-muted-foreground">{t('error_loading_data')}</p>
    </div>
  );
};

ShardNotFoundState.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShardNotFoundState };
