import ArtistSubmissions from 'components/artist-submissions/artist-submissions';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function ArtistSubmissionsPage({ showEmailCapture }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Artist Submissions" />
      <ArtistSubmissions />
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
