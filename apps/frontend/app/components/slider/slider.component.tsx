// global modules
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { type FC, type PropsWithChildren, useCallback, useEffect } from 'react';

// local modules
import { SlideButton } from './slider.slide-button';
import { useCanScrollNext, useCanScrollPrev, useScrollProgress } from './slider.hooks';

import {
  bar as barCn,
  barHolder as barHolderCn,
  buttons as buttonsCn,
  container as containerCn,
  controls as controlsCn,
  slider as sliderCn,
} from './slider.module.scss';

interface SliderProps extends PropsWithChildren {
  className?: string;
  showProgress?: boolean;
}

export const Slider: FC<SliderProps> = props => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: false });
  useEffect(() => () => emblaApi?.destroy(), []);

  const scrollProgress = useScrollProgress(emblaApi);
  const canScrollNext = useCanScrollNext(emblaApi);
  const canScrollPrev = useCanScrollPrev(emblaApi);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className={props.className}>
      <div className={controlsCn}>
        <div className={buttonsCn}>
          <SlideButton direction="left" disabled={!canScrollPrev} onClick={scrollPrev} />
          <SlideButton direction="right" disabled={!canScrollNext} onClick={scrollNext} />
        </div>

        <div>
          {!props.showProgress ? null : (
            <div className={barHolderCn}>
              <div className={barCn} style={{ width: `${scrollProgress}%` }} />
            </div>
          )}
        </div>
      </div>

      <div className={clsx(sliderCn, props.showProgress && 'mb-4')} ref={emblaRef}>
        <div className={containerCn}>{props.children}</div>
      </div>
    </div>
  );
};
