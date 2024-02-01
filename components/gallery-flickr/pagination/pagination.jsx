import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pagination.module.scss';
import clsx from 'clsx';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ setPage, page, numberOfPages }) {
  const numberAsArray = Array.from(
    { length: numberOfPages },
    (_, index) => index
  );
  return (
    <div className={styles.pagination}>
      <button onClick={() => setPage(page - 1)} className={styles.button}>
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>
      {numberAsArray.map(number => {
        return (
          <button
            key={`pagination-${number}`}
            onClick={() => setPage(number + 1)}
            className={clsx(
              styles.button,
              page === number + 1 && styles.active
            )}
          >
            {number + 1}
          </button>
        );
      })}
      <button onClick={() => setPage(page + 1)} className={styles.button}>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
}
