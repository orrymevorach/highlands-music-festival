import clsx from 'clsx';
import styles from './dots.module.scss';

export default function Dots({ data = [], index = 0, handleSetIndex }) {
  return (
    <div className={styles.dotsContainer}>
      {data.map((props, buttonIndex) => {
        const isActive = index === buttonIndex;
        return (
          <button
            key={`${buttonIndex}-dots`}
            className={clsx(styles.dot, isActive && styles.isActive)}
            onClick={() => handleSetIndex(buttonIndex)}
          />
        );
      })}
    </div>
  );
}
