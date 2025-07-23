import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import { type FC, type KeyboardEventHandler, useRef, useState } from 'react';

import { Badge } from '@repo/ui/components/Badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@repo/ui/components/Command';

interface Option {
  label: string;
  value: string;
}

/* -------------------------------------------------------------------------------------------------
 * TagsInput
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'TagsInput';

interface TagsInputProps {
  options: Option[];
  value?: Option[];
  placeholder?: string;
  onChange?: (value: Option[]) => void;
}

const TagsInput: FC<TagsInputProps> = ({ options, value, onChange, placeholder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(value ?? []);
  const [inputValue, setInputValue] = useState('');

  const updateSelected = (fn: (prev: Option[]) => Option[]) => {
    const newValues = fn(selected);
    setSelected(newValues);
    onChange?.(newValues);
  };

  const handleUnselect = (option: Option) => updateSelected((prev) => prev.filter((s) => s.value !== option.value));

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const input = inputRef.current;

    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          updateSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }

      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  };

  const selectables = options.filter((framework) => !selected.includes(framework));

  return (
    <Command className="overflow-visible bg-transparent" onKeyDown={handleKeyDown}>
      <div className="group inset-ring inset-ring-gray-a7 rounded-default bg-gray-surface px-3 py-2 text-sm ring-offset-background focus-within:outline-2 focus-within:outline-primary-8 focus-within:outline-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => (
            <Badge key={framework.value}>
              {framework.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleUnselect(framework)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(framework);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                type="button"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-a10"
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onValueChange={setInputValue}
            placeholder={placeholder}
            ref={inputRef}
            value={inputValue}
          />
        </div>
      </div>

      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      className={'cursor-pointer'}
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        updateSelected((prev) => [...prev, framework]);
                      }}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};

TagsInput.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { TagsInput };
export type { Option, TagsInputProps };
