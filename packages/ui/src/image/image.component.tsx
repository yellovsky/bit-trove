// global modules
import clsx from 'clsx';
import { type FC, type ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

// local modules
import { error as errorCn, img as imgCn } from './image.module.scss';

const useImageError = () => {
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const retry = useCallback(() => setError(false), []);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const handleError = () => setError(true);
    el.addEventListener('error', handleError);

    const handleLoadStart = () => setError(false);
    el.addEventListener('loadstart', handleLoadStart);

    return () => {
      el.removeEventListener('error', handleError);
      el.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  return { error, imgRef, retry };
};

export const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const { imgRef, error } = useImageError();
  return <img {...props} className={clsx(props.className, imgCn, error && errorCn)} ref={imgRef} />;
};
