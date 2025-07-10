import { type FC, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import * as Label from '@repo/ui/components/Label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/Select';

import type { GetManyShardsVariables } from '@entities/shards';

interface ShardsSortingDropdownProps {
  shardsVariables: GetManyShardsVariables;
}

export const ShardsSortingDropdown: FC<ShardsSortingDropdownProps> = ({ shardsVariables }) => {
  const id = useId();
  const { t } = useTranslation();

  const [_, setSearchParams] = useSearchParams();

  const setSort = (value: string) =>
    setSearchParams((prev) => {
      prev.set('sort', value);
      return prev;
    });

  return (
    <div className="flex items-center gap-2">
      <Label.Root className="text-muted-foreground text-sm" htmlFor={id}>
        {t('Sort by:')}
      </Label.Root>
      <Select onValueChange={setSort} value={shardsVariables.sort}>
        <SelectTrigger className="w-full sm:w-56" id={id}>
          <SelectValue placeholder={t('common:select_sort', 'Select sort order')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-createdAt">{t('sort.newest')}</SelectItem>
            <SelectItem value="createdAt">{t('sort.oldest')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
