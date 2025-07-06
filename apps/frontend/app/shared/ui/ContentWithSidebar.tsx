import type { FC, PropsWithChildren } from 'react';

/* -------------------------------------------------------------------------------------------------
 * ContentWithSidebar
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ContentWithSidebar';

interface ContentWithSidebarProps extends PropsWithChildren {
  sidebar?: React.ReactNode;
  className?: string;
}

const ContentWithSidebar: FC<ContentWithSidebarProps> = ({ children, sidebar, className }) => (
  <div className={`mx-auto max-w-7xl ${className}`}>
    {/* Main content area with responsive layout */}
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_300px]">
      {/* Main content */}
      <main className="min-w-0">{children}</main>

      {/* Sidebar - hidden on mobile, visible on desktop */}
      {sidebar && (
        <aside aria-label="Blog post sidebar" className="hidden xl:block">
          <div className="sticky top-6 space-y-6">{sidebar}</div>
        </aside>
      )}
    </div>
  </div>
);

ContentWithSidebar.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ContentWithSidebar };
export type { ContentWithSidebarProps };
