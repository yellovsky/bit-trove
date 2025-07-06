import { FileQuestionIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { BackToBlogListButton } from './BackToBlogListButton';

interface BlogPostNotFoundStateProps {
  className?: string;
}

export const BlogPostNotFoundState: FC<BlogPostNotFoundStateProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileQuestionIcon className="mb-4 h-12 w-12 text-muted-foreground" />
        <Heading className="mb-2" order={2}>
          {t('error.not_found.text')}
        </Heading>
        <p className="mb-6 text-muted-foreground">{t('error.not_found.description')}</p>
        <BackToBlogListButton />
      </div>
    </div>
  );
};
