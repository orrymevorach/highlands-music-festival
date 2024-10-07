import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pagination.module.scss';
import clsx from 'clsx';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function calculateNumberOfPages(totalItems) {
  const itemsPerPage = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}

export default function Pagination({ setPage, page, numberOfItems }) {
  const numberOfPages = calculateNumberOfPages(numberOfItems);
  const numberAsArray = Array.from(
    { length: numberOfPages },
    (_, index) => index
  );

  const handleSetPage = page => {
    window.scrollTo(0, 0);
    setPage(page);
  };
  return (
    <div className={styles.pagination}>
      <button onClick={() => handleSetPage(page - 1)} className={styles.button}>
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>
      {numberAsArray.map(number => {
        return (
          <button
            key={`pagination-${number}`}
            onClick={() => handleSetPage(number + 1)}
            className={clsx(
              styles.button,
              page === number + 1 && styles.active
            )}
          >
            {number + 1}
          </button>
        );
      })}
      <button onClick={() => handleSetPage(page + 1)} className={styles.button}>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
}
