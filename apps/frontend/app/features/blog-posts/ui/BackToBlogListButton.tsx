import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

/* -------------------------------------------------------------------------------------------------
 * BackToBlogListButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'BackToBlogListButton';

interface BackToBlogListButtonProps {
  className?: string;
}

const BackToBlogListButton: FC<BackToBlogListButtonProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Button asChild className={className} size="sm" variant="ghost">
      <Link to="/blog">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('menu_items.blog.title')}
      </Link>
    </Button>
  );
};

BackToBlogListButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BackToBlogListButton };

export type { BackToBlogListButtonProps };
