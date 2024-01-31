import { createFlickr } from 'flickr-sdk';
import styles from './gallery-flickr.module.scss';
import { useEffect, useState } from 'react';
import Takeover from 'components/takeover/takeover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function FlickrGallery() {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState('');

  const { flickr } = createFlickr(process.env.NEXT_PUBLIC_FLICKR_API_KEY);

  // Fetch data from the Flickr API or use your existing data fetching logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFlickr = async () => {
          const { photos } = await flickr('flickr.people.getPhotos', {
            user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
          });
          setPhotos(photos.photo);
        };
        getFlickr();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  const handleSetPhoto = index => {
    setShowModal(true);
    setIndex(index);
  };

  const photo = photos[index];

  return (
    <>
      {showModal && (
        <Takeover
          handleClose={() => setShowModal(false)}
          modalClassNames={styles.modal}
          closeButtonClassNames={styles.closeButton}
        >
          <img
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            alt={photo.title}
            title={photo.title}
          />

          {index !== 0 && (
            <button
              onClick={() => setIndex(index - 1)}
              className={clsx(styles.chevron, styles.chevronLeft)}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="white" size="2x" />
            </button>
          )}

          {index !== photos.length - 1 && (
            <button
              onClick={() => setIndex(index + 1)}
              className={clsx(styles.chevron, styles.chevronRight)}
            >
              <FontAwesomeIcon icon={faChevronRight} color="white" size="2x" />
            </button>
          )}
        </Takeover>
      )}

      <div className={styles.container}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => handleSetPhoto(index)}
            style={{
              backgroundImage: `url(https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg)`,
            }}
            className={styles.tile}
          ></div>
        ))}
      </div>
    </>
  );
}
