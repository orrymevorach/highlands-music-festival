import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pagination.module.scss';
import clsx from 'clsx';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from 'hooks';

function calculateNumberOfPages(totalItems) {
  const itemsPerPage = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}

export default function Pagination({ setPage, page, numberOfItems }) {
  const { isMobile } = useWindowSize();
  const numberOfPages = calculateNumberOfPages(numberOfItems);
  const visiblePages = 6;

  const getVisibleNumbers = () => {
    const start = Math.max(0, page - Math.ceil(visiblePages / 2));
    const end = Math.min(numberOfPages, start + visiblePages);
    const offsetStart = Math.max(0, end - visiblePages);
    return Array.from(
      { length: Math.min(visiblePages, numberOfPages) },
      (_, index) => offsetStart + index
    );
  };
  const numberAsArray = isMobile
    ? getVisibleNumbers()
    : Array.from({ length: numberOfPages }, (_, index) => index);

  const handleSetPage = page => {
    if (page > 0 && page <= numberOfPages) {
      window.scrollTo(0, 0);
      setPage(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handleSetPage(page - 1)}
        className={styles.button}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>
      {numberAsArray.map(number => (
        <button
          key={`pagination-${number}`}
          onClick={() => handleSetPage(number + 1)}
          className={clsx(styles.button, page === number + 1 && styles.active)}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={() => handleSetPage(page + 1)}
        className={styles.button}
        disabled={page === numberOfPages}
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
}
