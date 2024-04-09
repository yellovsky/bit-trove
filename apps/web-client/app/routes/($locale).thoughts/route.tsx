// global modules
import { Link, Outlet } from '@remix-run/react';

export default function ThoughtsRoute() {
  return (
    <div>
      <div>
        <Link to="/en">main</Link>
        <br />
        <Link to="/en/thoughts/recursive-typings-tree-structure">one</Link>
        <br />
        <Link to="/en/thoughts/typography-heading-elements">two</Link>
      </div>
      <Outlet />
    </div>
  );
}
