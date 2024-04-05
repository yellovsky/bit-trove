// global modules
import { useRef, type FC, useEffect } from 'react';

interface LoadMoreWhenVisibleProps {
  trigger: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const LoadMoreWhenVisible: FC<LoadMoreWhenVisibleProps> = ({
  trigger,
  isFetchingNextPage,
  hasNextPage,
}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    const observer = new IntersectionObserver(() => {
      if (hasNextPage && !isFetchingNextPage) trigger();
    });

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [trigger, isFetchingNextPage, hasNextPage]);

  return <div ref={targetRef} />;
};
