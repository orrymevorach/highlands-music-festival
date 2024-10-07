import ArtistSubmissions from 'components/ArtistSubmissions/ArtistSubmissions';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
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
