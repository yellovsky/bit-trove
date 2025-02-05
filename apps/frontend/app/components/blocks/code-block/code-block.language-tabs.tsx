// global modules
import clsx from 'clsx';
import type { CodeBlockVariant } from '@repo/api-models';
import type { FC } from 'react';

// local modules
import { active as activeCn, languages as languagesCn } from './code-block.module.scss';

interface LanguageTabsProps {
  variant: CodeBlockVariant;
  variants: CodeBlockVariant[];
  onSelectVariant(variant: CodeBlockVariant): void;
}

export const LanguageTabs: FC<LanguageTabsProps> = props =>
  props.variants.length <= 1 ? null : (
    <div className={languagesCn}>
      {props.variants.map(variant => (
        <button
          className={clsx(props.variant === variant && activeCn)}
          key={variant.label || variant.language}
          onClick={() => props.onSelectVariant(variant)}
        >
          {variant.label}
        </button>
      ))}
    </div>
  );
