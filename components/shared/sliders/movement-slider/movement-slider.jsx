import styles from './movement-slider.module.scss';
import { useSlider, useAutoSlide } from '../hooks';
import ArrowButton from '../components/arrow-button';
import Dots from '../components/dots';
import { useRef, useEffect, useCallback } from 'react';
import { useHasChanged } from 'hooks';

export default function Slider({
  data,
  children,
  hasDots = true,
  hasArrowButtons = true,
  hasTimer = false,
  allow360 = true, // 360 means sliding never stops, user can go to the end from the begining, or to the begining from the end
  variantButtons = false,
}) {
  const {
    state: { index, isAutoSlide },
    triggers: { NEXT_SLIDE, LAST_SLIDE, SET_SLIDE, START_AUTO_SLIDE },
  } = useSlider({ data });

  const { timer } = useAutoSlide({
    hasTimer,
    START_AUTO_SLIDE,
    isAutoSlide,
    NEXT_SLIDE,
  });

  const handleSetIndex = useCallback(
    buttonIndex => {
      clearTimeout(timer.current); // only applies to sliders with autoSlide
      SET_SLIDE(buttonIndex);
    },
    [SET_SLIDE, timer]
  );

  const transform = (index * 100) / data.length;

  const hideLeftButton = !allow360 && index === 0;
  const hideRightButton = !allow360 && index === data.length - 1;

  // If data in slider changes, slide it back to the first slide
  const hasDataChanged = useHasChanged(data);
  useEffect(() => {
    if (hasDataChanged) {
      handleSetIndex(0);
    }
  }, [handleSetIndex, hasDataChanged]);

  return (
    <div className={styles.outerContainer}>
      {hasArrowButtons && !hideLeftButton && (
        <ArrowButton
          isVariant={variantButtons}
          handleClick={LAST_SLIDE}
          direction="left"
        />
      )}
      <div
        className={styles.innerContainer}
        style={{
          width: `${100 * data.length}%`,
          transform: `translateX(-${transform}%)`,
        }}
      >
        {children}
      </div>
      {hasArrowButtons && !hideRightButton && (
        <ArrowButton
          isVariant={variantButtons}
          handleClick={NEXT_SLIDE}
          direction="right"
        />
      )}

      {hasDots && (
        <Dots data={data} index={index} handleSetIndex={handleSetIndex} />
      )}
    </div>
  );
}
