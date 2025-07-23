import { SearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import * as TextInput from '@repo/ui/components/TextInput';

import { SearchCommand } from '@features/search';

export const HeaderSearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleInputClick = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return (
    <>
      <div className="relative max-w-md flex-1">
        <TextInput.Root className="cursor-pointer" onClick={handleInputClick} placeholder="Search shards..." readOnly>
          <TextInput.StartSection>
            <SearchIcon />
          </TextInput.StartSection>
        </TextInput.Root>
      </div>

      <SearchCommand onOpenChange={handleSearchClose} open={isSearchOpen} />
    </>
  );
};
