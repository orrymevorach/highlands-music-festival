import Gallery from 'components/gallery/gallery';
import Head from 'components/head';
import Layout from 'components/layout/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS, colors } from 'utils/constants';

export default function GalleryPage({ showEmailCapture }) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Gallery" />
      <Layout hamburgerMenuColor={colors.beige}>
        <Gallery />
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
