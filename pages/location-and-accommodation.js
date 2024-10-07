import LocationAndAccommodation from 'components/location-and-accommodation/location-and-accommodation';
import Head from 'components/shared/Head/Head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { PAGE_SLUGS } from 'utils/constants';
import { getPageLoadData } from 'lib/contentful-lib';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/shared/Layout/Layout';

export default function LocationAndAccommodationPage({
  showEmailCapture,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Location & Accommodation" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
        <LocationAndAccommodation />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.LOCATION_AND_ACCOMMODATION,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
