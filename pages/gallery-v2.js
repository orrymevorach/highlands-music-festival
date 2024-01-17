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
      <Layout hamburgerMenuColor={colors.beige}>
        {/* <FlickrGallery /> */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            data-flickr-embed="true"
            href="https://www.flickr.com/photos/199929974@N08"
            title=""
          >
            <img
              src="https://live.staticflickr.com/65535/53456601230_105ff54cf8_z.jpg"
              width="640"
              height="480"
              alt=""
            />
          </a>
        </div>
        <script
          async
          src="//embedr.flickr.com/assets/client-code.js"
          charset="utf-8"
        ></script>
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
