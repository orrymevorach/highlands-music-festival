import { createFlickr } from 'flickr-sdk';
import styles from './gallery-flickr.module.scss';
import { useEffect, useState } from 'react';
import Pagination from './pagination/pagination';
import CarouselTakeover from './carousel-takover/carousel-takover';
import Loader from 'components/loader/loader';

export default function FlickrGallery() {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState('');
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const { flickr } = createFlickr(process.env.NEXT_PUBLIC_FLICKR_API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFlickr = async () => {
          const { photos } = await flickr('flickr.people.getPhotos', {
            user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
            page,
          });
          setPhotos(photos.photo);
          setNumberOfPages(photos.pages);
        };
        getFlickr();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]); // Run the effect only once when the component mounts

  const handleSetPhoto = index => {
    setShowModal(true);
    setIndex(index);
  };

  if (!photos?.length) return <Loader />;

  return (
    <>
      {showModal && (
        <CarouselTakeover
          photos={photos}
          index={index}
          setIndex={setIndex}
          setShowModal={setShowModal}
        />
      )}

      <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages} />

      <div className={styles.container}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => handleSetPhoto(index)}
            className={styles.tileContainer}
          >
            <div
              className={styles.tile}
              style={{
                backgroundImage: `url(https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg)`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages} />
    </>
  );
}
