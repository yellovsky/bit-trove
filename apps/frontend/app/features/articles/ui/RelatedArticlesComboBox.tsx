import { Check, ChevronsUpDown } from 'lucide-react';
import { type ComponentProps, type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounceCallback } from 'usehooks-ts';

import { Button } from '@repo/ui/components/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { cn } from '@repo/ui/lib/utils';

import { useApiClient } from '@shared/lib/api-client';
import { initialPageParam } from '@shared/lib/page-params';

import { getShortArticlesApi } from '@entities/articles';

export type ArticlesComboBoxItem = {
  value: string;
  label: string;
};

interface ArticlesComboboxProps {
  selectedItem?: ArticlesComboBoxItem;
  onSelect: (item: ArticlesComboBoxItem) => void;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  align?: ComponentProps<typeof PopoverContent>['align'];
}

export const RelatedArticlesComboBox: FC<ArticlesComboboxProps> = ({
  selectedItem,
  onSelect,
  searchPlaceholder = 'Search...',
  className,
  disabled = false,
  align,
}) => {
  const { i18n } = useTranslation();
  const { t: tCmsArticles } = useTranslation('cms_articles');
  const [open, setOpenState] = useState(false);
  const [items, setItems] = useState<ArticlesComboBoxItem[]>([selectedItem].filter(Boolean) as ArticlesComboBoxItem[]);
  const apiClient = useApiClient();

  const fetchItems = (search: string) =>
    getShortArticlesApi(apiClient, { locale: i18n.language, page: initialPageParam, search, sort: 'title' })
      .then((response) => setItems(response.data.items.map((item) => ({ label: item.title, value: item.id }))))
      .catch(() => setItems([selectedItem].filter(Boolean) as ArticlesComboBoxItem[]));

  const debouncedFetchItems = useDebounceCallback(fetchItems);
  const handleOnSearchChange = (e: string) => (e === '' && fetchItems(e)) || debouncedFetchItems(e);

  function setOpen(isOpen: boolean) {
    if (isOpen) {
      setItems([]);
      handleOnSearchChange('');
    }
    setOpenState(isOpen);
  }

  return (
    <Popover modal={true} onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button aria-expanded={open} className={cn('justify-between', className)} disabled={disabled} variant="outline">
          <span className="flex items-center truncate">
            {selectedItem?.label || tCmsArticles('upsert_article_form.related_articles_section.placeholder')}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className={cn('p-0')} style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command shouldFilter={false}>
          <CommandInput onValueChange={handleOnSearchChange} placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty />
            <CommandGroup>
              {items.map((item) => {
                if (!item.value) null;

                const isSelected = selectedItem?.value === item.value;

                return (
                  <CommandItem
                    key={item.value}
                    keywords={[item.label]}
                    onSelect={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                    value={item.value}
                  >
                    {item.label}
                    <Check className={cn('ml-auto h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
