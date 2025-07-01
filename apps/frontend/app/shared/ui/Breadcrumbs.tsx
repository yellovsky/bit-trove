import { type FC, Fragment } from 'react';
import type { To } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/Breadcrumb';
import { Link } from '@repo/ui/components/Link';

export interface AppBreadcrumbItem {
  to?: To;
  label: string;
}

interface BreadcrumbsProps {
  items: AppBreadcrumbItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => (
  <Breadcrumb>
    <BreadcrumbList>
      {items.map((item, index) => (
        <Fragment key={typeof item.to === 'string' ? item.to : index}>
          {item.to ? (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={item.to ?? '/'}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
          {index !== items.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);
