import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

import { getShardsLink } from '../lib/links';

/* -------------------------------------------------------------------------------------------------
 * BackToShardsListButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'BackToShardsListButton';

interface BackToShardsListButtonProps {
  className?: string;
}

const BackToShardsListButton: FC<BackToShardsListButtonProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Button asChild className={className} size="sm" variant="ghost">
      <Link to={getShardsLink()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('menu_items.shards.title')}
      </Link>
    </Button>
  );
};

BackToShardsListButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BackToShardsListButton };

export type { BackToShardsListButtonProps };
