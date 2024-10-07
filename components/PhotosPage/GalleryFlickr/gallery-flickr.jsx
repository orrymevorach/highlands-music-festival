import styles from './gallery-flickr.module.scss';
import { useEffect, useState } from 'react';
import Pagination from './pagination/pagination';
import CarouselTakeover from './carousel-takover/carousel-takover';
import Loader from 'components/shared/Loader/Loader';

export default function FlickrGallery({ photos }) {
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState('');
  const [page, setPage] = useState(1);
  const [currentPagePhotos, setCurrentPagePhotos] = useState([]);

  // Only show 100 images at a time
  useEffect(() => {
    const firstPhoto = (page - 1) * 100;
    const lastPhoto = page * 100 - 1;
    const photosToShow = photos.slice(firstPhoto, lastPhoto);
    setCurrentPagePhotos(photosToShow);
  }, [page]);

  const handleSetPhoto = index => {
    setShowModal(true);
    const currentIndex = index + (page - 1) * 100;
    setIndex(currentIndex);
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

      <Pagination page={page} setPage={setPage} numberOfItems={photos.length} />

      <div className={styles.container}>
        {currentPagePhotos.map((photo, index) => (
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
      <Pagination page={page} setPage={setPage} numberOfItems={photos.length} />
    </>
  );
}
