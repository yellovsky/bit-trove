import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ArticleRelationType } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Divider } from '@repo/ui/components/Divider';
import { Fieldset } from '@repo/ui/components/Fieldset';
import { IconButton } from '@repo/ui/components/IconButton';
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
  const { t: tCmsArticles } = useTranslation('cms_articles');
  const { i18n } = useTranslation();
  const article = useArticleQuery({ locale: i18n.language, slugOrId: articleId, type: 'blog_post' });

  return (
    <Paper className="flex items-center gap-2 ">
      <div className="grid flex-1 grid-cols-[min-content_1fr] gap-x-4 gap-y-2 text-sm">
        <Label className="text-muted-foreground">
          {tCmsArticles('upsert_article_form.related_articles_section.article_type')}
        </Label>{' '}
        <span>{relationType}</span>
        <Label className="text-muted-foreground">
          {tCmsArticles('upsert_article_form.related_articles_section.article_title')}
        </Label>{' '}
        <span>{article.data?.data.title}</span>
      </div>
      <IconButton aria-label="Delete" onClick={onDelete} palette="red" size="md" type="button" variant="soft">
        <Trash2Icon />
      </IconButton>
    </Paper>
  );
};

interface RelatedArticlesProps {
  className?: string;
  articlesWithRelation: Array<{ articleId: string; relationType: ArticleRelationType }>;
  onDelete: (articleId: string) => void;
}

const RelatedArticles = ({ className, articlesWithRelation, onDelete }: RelatedArticlesProps) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

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
    <div>{tCmsArticles('upsert_article_form.related_articles_section.no_related_articles')}</div>
  );
};

interface AddNewRelationProps {
  onAdd: (relation: ArticleRelationType, articleId: string) => void;
}

const AddNewRelation = ({ onAdd }: AddNewRelationProps) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');
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
              <Select.Value placeholder={tCmsArticles('upsert_article_form.related_articles_section.placeholder')} />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="related">
                {tCmsArticles('upsert_article_form.related_articles_section.relation_types.related')}
              </Select.Item>
              <Select.Item value="furtherReading">
                {tCmsArticles('upsert_article_form.related_articles_section.relation_types.furtherReading')}
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div className="flex-1">
          <RelatedArticlesComboBox className="w-full" onSelect={setArticle} selectedItem={article} />
        </div>
      </div>

      <Button className="w-full" onClick={handleClick} type="button">
        {tCmsArticles('upsert_article_form.related_articles_section.add_button')}
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

export const UpsertRelatedArticlesSection = ({
  articlesWithRelation,
  onAdd,
  onDelete,
  className,
  legend,
}: RelatedArticlesSectionProps) => (
  <Fieldset className={className} legend={legend} variant="filled">
    <RelatedArticles articlesWithRelation={articlesWithRelation} onDelete={onDelete} />
    <Divider className="my-4" />
    <AddNewRelation onAdd={onAdd} />
  </Fieldset>
);
