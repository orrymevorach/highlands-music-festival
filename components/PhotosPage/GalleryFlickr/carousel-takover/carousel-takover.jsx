import Takeover from 'components/shared/Takeover/Takeover';
import { useCallback, useEffect } from 'react';
import styles from './carousel-takeover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function CarouselTakeover({
  setIndex,
  setShowModal,
  index,
  photos,
}) {
  const modalPhoto = photos[index].url;

  const handleCloseModal = () => {
    setIndex('');
    setShowModal(false);
  };

  const isFirstImage = index === 0;
  const isLastImge = index === photos.length - 1;

  const changeImage = useCallback(
    e => {
      if (e.key === 'ArrowLeft') {
        setIndex(isFirstImage ? 0 : index - 1);
      } else if (e.key === 'ArrowRight') {
        setIndex(isLastImge ? index : index + 1);
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    },
    [index, setIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', changeImage);

    return function cleanup() {
      document.removeEventListener('keydown', changeImage);
    };
  });
  return (
    <Takeover
      handleClose={handleCloseModal}
      modalClassNames={styles.modal}
      isCloseButtonDark
    >
      {!isFirstImage && (
        <button
          onClick={() => setIndex(index - 1)}
          className={clsx(styles.chevron, styles.chevronLeft)}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="white" size="2x" />
        </button>
      )}
      <img src={modalPhoto} alt="" />

      {!isLastImge && (
        <button
          onClick={() => setIndex(index + 1)}
          className={clsx(styles.chevron, styles.chevronRight)}
        >
          <FontAwesomeIcon icon={faChevronRight} color="white" size="2x" />
        </button>
      )}
    </Takeover>
  );
}
