import FlickrGallery from 'components/gallery-flickr/gallery-flickr';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS, colors } from 'utils/constants';
import { createFlickr } from 'flickr-sdk';

export default function GalleryPage({
  showEmailCapture,
  photos,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);

  return (
    <>
      <Head title="Gallery" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <FlickrGallery photos={photos} />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.PHOTOS,
  });

  const { flickr } = createFlickr(process.env.NEXT_PUBLIC_FLICKR_API_KEY);

  const pageOneResponse = await flickr('flickr.photosets.getPhotos', {
    user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
    photoset_id: '72177720314508393',
    page: 1,
    per_page: 500, // default
  });

  const pageTwoResponse = await flickr('flickr.photosets.getPhotos', {
    user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
    photoset_id: '72177720314508393',
    page: 2,
    per_page: 500, // default
  });

  // Returns max 1000 photos
  const allPhotosets = [
    ...pageOneResponse.photoset.photo,
    ...pageTwoResponse.photoset.photo,
  ];

  const photos = await Promise.all(
    allPhotosets.map(async photo => {
      const { sizes } = await flickr('flickr.photos.getSizes', {
        photo_id: photo.id,
      });
      photo.sizes = sizes.size;
      return photo;
    })
  );
  return {
    props: {
      ...pageLoadData,
      photos,
    },
  };
}
