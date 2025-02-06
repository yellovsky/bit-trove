// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { BlogPostListFP, GuideItemListFP } from '@repo/api-models';

// local modules
import { GuidesSection } from './guides-section';
import { TimelineSection } from './timeline-section';
import { description as descriptionCn, page as pageCn, title as titleCn } from './page.module.scss';

interface IndexPageProps {
  guidesFP: GuideItemListFP;
  blogPostFP: BlogPostListFP;
}

export const IndexPage: FC<IndexPageProps> = ({ blogPostFP, guidesFP }) => {
  const { t } = useTranslation();

  return (
    <div className={pageCn}>
      <div className={titleCn}>{t('INDEX_PAGE_TITLE')}</div>
      <div className={descriptionCn}>{t('INDEX_PAGE_DESCRIPTION')}</div>

      <GuidesSection guidesFP={guidesFP} />
      <TimelineSection blogPostFP={blogPostFP} />
    </div>
  );
};
