import { useEffect, useState } from 'react';
import styles from './toggle.module.scss';

export default function Toggle({ name, options, handleClick, defaultOption }) {
  const [translate, setTranslate] = useState('0%');

  // Set the default checked on page load
  useEffect(() => {
    const defaultIndex = options.findIndex(
      option => option.label === defaultOption
    );
    if (defaultIndex >= 0) {
      handleSelectToggle({
        option: options[defaultIndex],
        index: defaultIndex,
      });
    }
  }, []);

  const handleSelectToggle = ({ option, index }) => {
    setTranslate(`${index}00%`);
    handleClick(option);
  };

  return (
    <div className={styles.container}>
      <div className={styles.switch}>
        {options.map((option, index) => {
          return (
            <div
              key={option.label}
              className={styles.option}
              style={{ width: `${100 / options.length}%` }}
            >
              <input
                type="radio"
                id={option.label}
                name={name}
                value={option.label}
                className={styles.input}
                onClick={() => handleSelectToggle({ option, index })}
                defaultChecked={option.label === defaultOption} // Set the default checked based on defaultOption
              />
              <label htmlFor={option.label} className={styles.label}>
                {option.label}
              </label>
            </div>
          );
        })}
        <span
          className={styles.active}
          style={{
            transform: `translateX(${translate})`,
            width: `${100 / options.length}%`,
          }}
        ></span>
      </div>
    </div>
  );
}
