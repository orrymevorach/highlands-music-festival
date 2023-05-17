import { useEffect, useRef } from 'react';

export default function useAutoSlide({
  hasTimer,
  START_AUTO_SLIDE,
  isAutoSlide,
  NEXT_SLIDE,
}) {
  const timer = useRef(null);

  useEffect(() => {
    hasTimer && START_AUTO_SLIDE();
  }, []);

  // This is required to get setTeimout and clearTimeout working with React
  useEffect(() => {
    timer.current =
      isAutoSlide &&
      setTimeout(() => {
        NEXT_SLIDE();
      }, 5000);
    return () => clearInterval(timer.current);
  }, [NEXT_SLIDE, isAutoSlide]);

  return { timer };
}
