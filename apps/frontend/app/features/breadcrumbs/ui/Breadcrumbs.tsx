import * as R from 'ramda';
import { type ComponentProps, type FC, Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/Breadcrumb';
import { Skeleton } from '@repo/ui/components/Skeleton';
import { TextLink } from '@repo/ui/components/Typography';

import type { AppBreadcrumb } from '../model/breadcrumb.model';

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs
 * -----------------------------------------------------------------------------------------------*/
const BREADCRUMBS_NAME = 'Breadcrumbs';

interface BreadcrumbsProps {
  items: AppBreadcrumb[];
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) =>
  !items.length ? null : (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={typeof item.to === 'string' ? item.to : index}>
            {index === items.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <TextLink to={item.to ?? '/'}>{item.label}</TextLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );

Breadcrumbs.displayName = BREADCRUMBS_NAME;

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs
 * -----------------------------------------------------------------------------------------------*/
const BREADCRUMBS_PENDING_NAME = 'BreadcrumbsPending';

const BREADCRUMBS_PENDING_ITEMS_COUNT = 3;

type BreadcrumbsPendingProps = ComponentProps<'div'>;

const BreadcrumbsPending: FC<BreadcrumbsPendingProps> = (props) => (
  <Breadcrumb {...props}>
    <BreadcrumbList>
      {R.times(
        (key) => (
          <Fragment key={key}>
            <BreadcrumbPage>
              <Skeleton className="h-5 w-24" />
            </BreadcrumbPage>
            {key < BREADCRUMBS_PENDING_ITEMS_COUNT - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ),
        BREADCRUMBS_PENDING_ITEMS_COUNT
      )}
    </BreadcrumbList>
  </Breadcrumb>
);

BreadcrumbsPending.displayName = BREADCRUMBS_PENDING_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Breadcrumbs, BreadcrumbsPending };
export type { BreadcrumbsProps, BreadcrumbsPendingProps };
