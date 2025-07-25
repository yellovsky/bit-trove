import { SearchIcon } from 'lucide-react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as TextInput from '@repo/ui/components/TextInput';

import { SearchCommand } from '@features/search';

/* -------------------------------------------------------------------------------------------------
 * HeaderSearchInput
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'HeaderSearchInput';

const HeaderSearchInput: FC = () => {
  const { t } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleInputClick = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);

  return (
    <>
      <div className="relative max-w-md flex-1">
        <TextInput.Root
          className="cursor-pointer"
          onClick={handleInputClick}
          placeholder={t('search.placeholder')}
          readOnly
        >
          <TextInput.StartSection>
            <SearchIcon />
          </TextInput.StartSection>
        </TextInput.Root>
      </div>

      <SearchCommand onOpenChange={handleSearchClose} open={isSearchOpen} />
    </>
  );
};

HeaderSearchInput.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { HeaderSearchInput };
