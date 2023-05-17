import clsx from 'clsx';
import styles from './slide.module.scss';

export default function Slide({ child, childIndex, index, isAutoSlide }) {
  return (
    <div className={clsx(styles.hide, childIndex === index && styles.fadeIn)}>
      <div className={isAutoSlide && styles.fadeOut}>{child}</div>
    </div>
  );
}
