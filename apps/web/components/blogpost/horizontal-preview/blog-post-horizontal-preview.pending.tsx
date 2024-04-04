// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { TitlePending } from '@bit-trove/ui/title';
import { SmallBadgePending } from '@bit-trove/ui/small-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';

// local modules
import {
  text as textCn,
  title as titleCn,
  badges as badgesCn,
  pending as pendingCn,
  pendingLine as pendingLineCn,
  coverHolder as coverHolderCn,
  coverRestrictor as coverRestrictorCn,
  blogPostHorizontalPreview as blogPostHorizontalPreviewCn,
} from './blog-post-horizontal-preview.module.scss';

export const BlogpostHorizontalPreviewPending: FC = () => (
  <div className={cn(blogPostHorizontalPreviewCn, pendingCn)}>
    <div className={coverRestrictorCn}>
      <div className={coverHolderCn} />
    </div>

    <div>
      <TitlePending styledAs="h4" className={titleCn} />

      <SmallBadgesHolder className={badgesCn}>
        <SmallBadgePending />
        <SmallBadgePending />
      </SmallBadgesHolder>

      <div className={textCn}>
        <div className={pendingLineCn}>&nbsp;</div>
        <div className={pendingLineCn}>&nbsp;</div>
      </div>
    </div>
  </div>
);
