import { SearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { TextInput } from '@repo/ui/components/TextInput';

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
        <TextInput className="cursor-pointer pl-9" onClick={handleInputClick} placeholder="Search shards..." readOnly />
        <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
      </div>

      <SearchCommand onOpenChange={handleSearchClose} open={isSearchOpen} />
    </>
  );
};
