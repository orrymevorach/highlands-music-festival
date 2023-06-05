import styles from './fade-slider.module.scss';
import { useSlider, useAutoSlide } from '../hooks';
import ArrowButton from '../components/arrow-button';
import Dots from '../components/dots';
import Slide from './slide';

export default function FadeSlider({
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

  const handleSetIndex = buttonIndex => {
    clearTimeout(timer.current); // only applies to sliders with autoSlide
    SET_SLIDE(buttonIndex);
  };

  const hideLeftButton = !allow360 && index === 0;
  const hideRightButton = !allow360 && index === data.length - 1;

  return (
    <div className={styles.outerContainer}>
      {hasArrowButtons && !hideLeftButton && (
        <ArrowButton
          isVariant={variantButtons}
          handleClick={NEXT_SLIDE}
          direction="left"
        />
      )}
      {children.map((child, childIndex) => {
        return (
          <Slide
            key={`slide-${childIndex}`}
            child={child}
            childIndex={childIndex}
            index={index}
            isAutoSlide={isAutoSlide}
          />
        );
      })}
      {hasArrowButtons && !hideRightButton && (
        <ArrowButton
          isVariant={variantButtons}
          handleClick={LAST_SLIDE}
          direction="right"
        />
      )}

      {hasDots && (
        <Dots data={data} index={index} handleSetIndex={handleSetIndex} />
      )}
    </div>
  );
}
