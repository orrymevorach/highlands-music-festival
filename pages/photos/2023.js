import FlickrGallery from 'components/gallery-flickr/gallery-flickr';
import Head from 'components/head';
import Layout from 'components/layout/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS, colors } from 'utils/constants';

export default function GalleryPage({ showEmailCapture }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);

  return (
    <>
      <Head title="Gallery" />
      <Layout>
        <FlickrGallery />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.GALLERY,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
