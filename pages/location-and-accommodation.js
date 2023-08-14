import LocationAndAccommodation from 'components/location-and-accommodation';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { PAGE_SLUGS } from 'utils/constants';
import { getPageLoadData } from 'lib/contentful-lib';
import { useFacebookPixel } from 'hooks';

export default function LocationAndAccommodationPage({ showEmailCapture }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Location & Accommodation" />
      <LocationAndAccommodation />
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
