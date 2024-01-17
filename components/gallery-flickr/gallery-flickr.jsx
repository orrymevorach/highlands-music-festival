import { createFlickr } from 'flickr-sdk';
import styles from './gallery-flickr.module.scss';
import { useEffect, useState } from 'react';
import Takeover from 'components/takeover/takeover';

export default function FlickrGallery() {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');

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

  const handleSetPhoto = photo => {
    setShowModal(true);
    setPhoto(photo);
  };

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
        </Takeover>
      )}

      <div className={styles.container}>
        {photos.map(photo => (
          <div
            key={photo.id}
            onClick={() => handleSetPhoto(photo)}
            className={styles.tile}
          >
            <img
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              alt={photo.title}
              title={photo.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
