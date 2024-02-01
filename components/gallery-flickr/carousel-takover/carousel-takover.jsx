import Takeover from 'components/takeover/takeover';
import { useCallback, useEffect, useState } from 'react';
import styles from './carousel-takeover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { createFlickr } from 'flickr-sdk';

export default function CarouselTakeover({
  setIndex,
  setShowModal,
  index,
  photos,
}) {
  const [modalPhoto, setModalPhoto] = useState('');
  const { flickr } = createFlickr(process.env.NEXT_PUBLIC_FLICKR_API_KEY);
  //   Get large version of photo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFlickr = async () => {
          const response = await flickr('flickr.photos.getSizes', {
            photo_id: photos[index].id,
          });
          const largePhoto = response.sizes.size.find(
            ({ label }) => label === 'Large'
          );
          setModalPhoto(largePhoto);
        };
        getFlickr();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [index]);

  const handleCloseModal = () => {
    setIndex('');
    setShowModal(false);
    setModalPhoto('');
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
      closeButtonClassNames={styles.closeButton}
    >
      {!isFirstImage && (
        <button
          onClick={() => setIndex(index - 1)}
          className={clsx(styles.chevron, styles.chevronLeft)}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="white" size="2x" />
        </button>
      )}
      <img src={modalPhoto.source} alt="" />

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
