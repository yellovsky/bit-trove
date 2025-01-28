// global modules
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { type FC, useEffect } from 'react';

interface OnIntersectingChangeProps {
  onChange(isIntersecting: boolean): void;
}

export const OnIntersectingChange: FC<OnIntersectingChangeProps> = ({ onChange }) => {
  const [ref, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting === undefined) return;
    onChange(entry.isIntersecting);
  }, [entry?.isIntersecting, onChange]);

  return <div ref={ref} />;
};
