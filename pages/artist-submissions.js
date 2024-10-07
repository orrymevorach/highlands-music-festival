import ArtistSubmissions from 'components/artist-submissions/artist-submissions';
import Head from 'components/head/head';
import Layout from 'components/layout/layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function ArtistSubmissionsPage({
  showEmailCapture,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Artist Submissions" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
        <ArtistSubmissions />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ARTIST_SUBMISSIONS,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
