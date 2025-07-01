import { type FC, Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/Breadcrumb';
import { Link } from '@repo/ui/components/Link';

import type { AppBreadcrumb } from '../model/breadcrumb.model';

interface BreadcrumbsProps {
  items: AppBreadcrumb[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) =>
  !items.length ? null : (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={typeof item.to === 'string' ? item.to : index}>
            {index === items.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={item.to ?? '/'}>{item.label}</Link>
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
