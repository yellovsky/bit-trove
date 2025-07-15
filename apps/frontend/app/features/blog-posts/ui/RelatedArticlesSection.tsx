import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ArticleRelationType } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Divider } from '@repo/ui/components/Divider';
import { Fieldset } from '@repo/ui/components/Fieldset';
import { Label } from '@repo/ui/components/Label';
import { Paper } from '@repo/ui/components/Paper';
import * as Select from '@repo/ui/components/Select';
import { cn } from '@repo/ui/lib/utils';

import { useArticleQuery } from '@entities/articles';

import { type ArticlesComboBoxItem, RelatedArticlesComboBox } from './RelatedArticlesComboBox';

interface RelatedArticleRowProps {
  articleId: string;
  relationType: ArticleRelationType;
  onDelete: () => void;
}

const RelatedArticleRow = ({ articleId, relationType, onDelete }: RelatedArticleRowProps) => {
  const { i18n } = useTranslation();
  const article = useArticleQuery({ locale: i18n.language, slugOrId: articleId, type: 'blog_post' });

  return (
    <Paper className="flex items-center gap-2 ">
      <div className="grid flex-1 grid-cols-[min-content_1fr] gap-x-4 gap-y-2 text-sm">
        <Label className="text-muted-foreground">Type:</Label> <span>{relationType}</span>
        <Label className="text-muted-foreground">Article:</Label> <span>{article.data?.data.title}</span>
      </div>
      <Button aria-label="Delete" onClick={onDelete} size="icon" type="button" variant="ghost">
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </Paper>
  );
};

interface RelatedArticlesProps {
  className?: string;
  articlesWithRelation: Array<{ articleId: string; relationType: ArticleRelationType }>;
  onDelete: (articleId: string) => void;
}

const RelatedArticles = ({ className, articlesWithRelation, onDelete }: RelatedArticlesProps) => {
  return articlesWithRelation.length > 0 ? (
    <div className={cn('flex flex-col gap-2', className)}>
      {articlesWithRelation.map((relation) => (
        <RelatedArticleRow
          articleId={relation.articleId}
          key={relation.articleId}
          onDelete={() => onDelete(relation.articleId)}
          relationType={relation.relationType}
        />
      ))}
    </div>
  ) : (
    <div>No related articles</div>
  );
};

interface AddNewRelationProps {
  onAdd: (relation: ArticleRelationType, articleId: string) => void;
}

const AddNewRelation = ({ onAdd }: AddNewRelationProps) => {
  const [relationType, setRelationType] = useState<ArticleRelationType>('related');
  const [article, setArticle] = useState<ArticlesComboBoxItem | undefined>(undefined);

  const handleClick = () => {
    if (article) onAdd(relationType, article.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-64">
          <Select.Root onValueChange={(value) => setRelationType(value as ArticleRelationType)} value={relationType}>
            <Select.Trigger className="w-full">
              <Select.Value placeholder="Select an article" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="related">related</Select.Item>
              <Select.Item value="furtherReading">furtherReading</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div className="flex-1">
          <RelatedArticlesComboBox className="w-full" onSelect={setArticle} selectedItem={article} />
        </div>
      </div>

      <Button className="w-full" onClick={handleClick} type="button">
        Add
      </Button>
    </div>
  );
};

export interface RelatedArticlesSectionProps {
  articlesWithRelation: Array<{ articleId: string; relationType: ArticleRelationType }>;
  onAdd: (relation: ArticleRelationType, articleId: string) => void;
  onDelete: (articleId: string) => void;
  className?: string;
  legend?: string;
}

export const RelatedArticlesSection = ({
  articlesWithRelation,
  onAdd,
  onDelete,
  className,
  legend,
}: RelatedArticlesSectionProps) => {
  return (
    <Fieldset className={className} legend={legend}>
      <RelatedArticles articlesWithRelation={articlesWithRelation} onDelete={onDelete} />
      <Divider className="my-4" />
      <AddNewRelation onAdd={onAdd} />
    </Fieldset>
  );
};
