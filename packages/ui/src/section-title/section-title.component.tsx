// global modules
import type { FC, PropsWithChildren } from 'react';

// local modules
import { sectionTitle as sectionTitleCn } from './section-title..module.scss';

export const SectionTitle: FC<PropsWithChildren> = (props) => (
  <h4 {...props} className={sectionTitleCn} />
);
