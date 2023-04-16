import LocationAndAccommodation from 'components/location-and-accommodation';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { PAGE_SLUGS } from 'utils/constants';
import { getPageLoadData } from 'graphql/contentful-lib';

export default function LocationAndAccommodationPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <LocationAndAccommodation />
    </EmailCaptureProvider>
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
