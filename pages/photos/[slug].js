import PhotoGallery from 'components/PhotosPage/GalleryFlickr/photo-gallery';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import { getRecordsByFieldValue } from 'lib/airtable-lib';

export default function GalleryPage({
  showEmailCapture,
  photos = [],
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);

  return (
    <>
      <Head title="Gallery" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <PhotoGallery photos={photos} />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = ['2023', '2024'];
  return {
    paths: paths.map(slug => `/photos/${slug}`),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.PHOTOS,
  });

  const slug = context.params.slug;
  const { records: photos } = await getRecordsByFieldValue({
    tableId: 'Photo Library',
    fieldName: 'Album',
    fieldValue: slug,
  });

  return {
    props: {
      ...pageLoadData,
      photos,
    },
  };
}
