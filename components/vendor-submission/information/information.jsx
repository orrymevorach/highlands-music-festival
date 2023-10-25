import styles from './information.module.scss';

export default function Information({ heading, text, listItems = [] }) {
  return (
    <div className={styles.informationContainer}>
      {heading && <p className={styles.informationHeading}>{heading}</p>}
      {text && <p className={styles.text}>{text}</p>}
      {listItems.length > 0 && (
        <ul>
          {listItems.map(item => (
            <li key={item} className={styles.listItem}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
