// global modules
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const sanitizeProgress = (progress: number | undefined): number =>
  Math.round(Math.max(0, Math.min(1, progress || 0)) * 100);

export const useScrollProgress = (emblaApi: UseEmblaCarouselType[1]): number => {
  const [scrollProgress, setScrollProgress] = useState(
    sanitizeProgress(emblaApi?.scrollProgress()),
  );

  const handleScroll = useCallback(
    (api: UseEmblaCarouselType[1]) => setScrollProgress(sanitizeProgress(api?.scrollProgress())),
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    handleScroll(emblaApi);
    emblaApi.on('reInit', handleScroll).on('scroll', handleScroll).on('slideFocus', handleScroll);

    return () => {
      emblaApi
        .off('reInit', handleScroll)
        .off('scroll', handleScroll)
        .off('slideFocus', handleScroll);
    };
  }, [emblaApi, handleScroll]);

  return scrollProgress;
};

export const useCanScrollNext = (emblaApi: UseEmblaCarouselType[1]): boolean => {
  const [canScrollNext, setCanScrollNext] = useState(emblaApi?.canScrollNext() || false);

  const handleScroll = useCallback(
    (api: UseEmblaCarouselType[1]) => setCanScrollNext(api?.canScrollNext() || false),
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    handleScroll(emblaApi);
    emblaApi.on('reInit', handleScroll).on('scroll', handleScroll).on('slideFocus', handleScroll);

    return () => {
      emblaApi
        .off('reInit', handleScroll)
        .off('scroll', handleScroll)
        .off('slideFocus', handleScroll);
    };
  }, [emblaApi, handleScroll]);

  return canScrollNext;
};

export const useCanScrollPrev = (emblaApi: UseEmblaCarouselType[1]): boolean => {
  const [canScrollPrev, setCanScrollPrev] = useState(emblaApi?.canScrollPrev() || false);

  const handleScroll = useCallback(
    (api: UseEmblaCarouselType[1]) => setCanScrollPrev(api?.canScrollPrev() || false),
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    handleScroll(emblaApi);
    emblaApi.on('reInit', handleScroll).on('scroll', handleScroll).on('slideFocus', handleScroll);

    return () => {
      emblaApi
        .off('reInit', handleScroll)
        .off('scroll', handleScroll)
        .off('slideFocus', handleScroll);
    };
  }, [emblaApi, handleScroll]);

  return canScrollPrev;
};
