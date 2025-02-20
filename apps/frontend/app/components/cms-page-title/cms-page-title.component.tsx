// global modules
import type { FC, PropsWithChildren } from 'react';

// common modules
import { Button } from '~/components/button';
import { Heading } from '~/components/heading';

// local modules
import { cmsPageTitle as cmsPageTitleCn } from './cms-page-title.module.scss';

interface CMSPageTitleProps extends PropsWithChildren {
  onCreateClick?(): void;
}

export const CMSPageTitle: FC<CMSPageTitleProps> = props => (
  <div className={cmsPageTitleCn}>
    <div>
      <Heading as="h1" className="mb-4" size="lg">
        {props.children}
      </Heading>
    </div>

    <div>
      {!props.onCreateClick ? null : (
        <Button onClick={props.onCreateClick} variant="filled">
          Create
        </Button>
      )}
    </div>
  </div>
);
